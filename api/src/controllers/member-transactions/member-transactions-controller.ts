import { Transaction as SequelizeTransaction } from 'sequelize'

import { TRANSACTION_STATUS } from '@/constants/index.ts'
import { verifyMemberState, verifyPartnerState } from '@/controllers/utils/index.ts'
import { TransactionCreationAttributes } from '@/db/models/index.ts'
import {
  addTransaction,
  countTransactions,
  findTransaction,
  findTransactions,
  modifyMember,
  modifyTransaction,
  removeTransaction
} from '@/db/providers/index.ts'
import { InternalServerError, NotFoundError, ValidationError, runAsTransaction } from '@/utils/index.ts'

const getMemberTransactionsController = async (partnerId: number, memberId: number) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    await verifyPartnerState(partnerId, sequelizeTransaction)

    await verifyMemberState(partnerId, memberId, sequelizeTransaction)

    return findTransactions({}, partnerId, memberId, sequelizeTransaction)
  })
}

const getMemberTransactionController = async (partnerId: number, memberId: number, transactionId: number) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    await verifyPartnerState(partnerId, sequelizeTransaction)

    await verifyMemberState(partnerId, memberId, sequelizeTransaction)

    const transaction = await findTransaction({}, partnerId, memberId, transactionId, sequelizeTransaction)

    if (!transaction) {
      throw new NotFoundError(`Transaction with id of ${transactionId} not found!`)
    }

    return transaction
  })
}

const postMemberTransactionController = async (
  partnerId: number,
  memberId: number,
  transactionPayload: TransactionCreationAttributes
) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    const transactionsCount = await countTransactions({}, partnerId, memberId, sequelizeTransaction)

    if (transactionsCount >= parseInt(process.env.MAX_TRANSACTIONS_PER_MEMBER as string)) {
      throw new ValidationError(`You have reached the max amount of transactions for partner with id of ${partnerId}`)
    }

    await verifyPartnerState(partnerId, sequelizeTransaction)

    const member = await verifyMemberState(partnerId, memberId, sequelizeTransaction)

    console.log("balance", member.balance, transactionPayload.amount);

    if (member.balance - transactionPayload.amount < 0) {
      throw new ValidationError('Member balance cannot go below zero!')
    }

    const transaction = await addTransaction(partnerId, memberId, transactionPayload, sequelizeTransaction)

    if (!transaction) {
      throw new InternalServerError('Transaction could not be created!')
    }

    const updatedMember = await modifyMember(
      partnerId,
      memberId,
      {
        ...member,
        balance: member.balance - transaction.amount
      },
      sequelizeTransaction
    )

    if (!updatedMember) {
      throw new NotFoundError(`Unable to update balance for member with id of ${memberId}`)
    }

    return transaction
  })
}

const patchMemberTransactionController = async (
  partnerId: number,
  memberId: number,
  transactionId: number,
  transactionPayload: TransactionCreationAttributes
) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    await verifyPartnerState(partnerId, sequelizeTransaction)

    const member = await verifyMemberState(partnerId, memberId, sequelizeTransaction)

    if (member.balance + transactionPayload.amount < 0) {
      throw new ValidationError('Member balance cannot go below zero!')
    }

    const transaction = await findTransaction({}, partnerId, memberId, transactionId, sequelizeTransaction)

    if (!transaction) {
      throw new NotFoundError(`Transaction with id of ${transactionId} could not be found!`)
    }

    if (transaction.status !== TRANSACTION_STATUS.PENDING) {
      throw new ValidationError(
        `Transaction with id of ${transactionId} cannot be updated since its status is ${transaction.status}!`
      )
    }

    const updatedTransaction = await modifyTransaction(partnerId, memberId, transactionId, transactionPayload)

    if (!updatedTransaction) {
      throw new InternalServerError(`Transaction with id of ${transactionId} could not be updated!`)
    }

    const isVoided = updatedTransaction.status === TRANSACTION_STATUS.VOIDED
    const isNegativeBalance = -Math.abs(updatedTransaction.amount) + member.balance < 0
    const isVoidedAndNegativeBalance = isVoided && isNegativeBalance
    const deductOrZeroBalance = isVoidedAndNegativeBalance ? 0 : -Math.abs(updatedTransaction.amount)

    const updatedMember = await modifyMember(
      partnerId,
      memberId,
      {
        ...member,
        balance: member.balance + (isVoided ? deductOrZeroBalance : updatedTransaction.amount)
      },
      sequelizeTransaction
    )

    if (!updatedMember) {
      throw new NotFoundError(`Unable to update balance for member with id of ${memberId}`)
    }

    return updatedTransaction
  })
}

const deleteMemberTransactionController = async (partnerId: number, memberId: number, transactionId: number) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    await verifyPartnerState(partnerId, sequelizeTransaction)

    const count = await removeTransaction(partnerId, memberId, transactionId, sequelizeTransaction)

    if (count === 0) {
      throw new InternalServerError(`No transaction with id of ${transactionId} was deleted!`)
    }

    return count
  })
}

export {
  deleteMemberTransactionController,
  getMemberTransactionController,
  getMemberTransactionsController,
  patchMemberTransactionController,
  postMemberTransactionController
}
