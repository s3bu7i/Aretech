import { Transaction as SequelizeTransaction, WhereOptions } from 'sequelize'

import { Transaction, TransactionCreationAttributes } from '@/db/models/index.ts'

const countTransactions = (
  where: WhereOptions<Transaction>,
  partnerId: number,
  memberId: number,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Transaction.count({ where: { ...where, partnerId, memberId }, transaction: sequelizeTransaction })
}

const findTransactions = (
  where: WhereOptions<Transaction>,
  partnerId: number,
  memberId: number,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Transaction.findAll({ where: { ...where, partnerId, memberId }, transaction: sequelizeTransaction, raw: true })
}

const findTransactionsByPartner = (
  where: WhereOptions<Transaction>,
  partnerId: number,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Transaction.findAll({ where: { ...where, partnerId }, transaction: sequelizeTransaction, raw: true })
}

const findTransaction = (
  where: WhereOptions<Transaction>,
  partnerId: number,
  memberId: number,
  transactionId: number,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Transaction.findOne({
    where: { ...where, id: transactionId, partnerId, memberId },
    transaction: sequelizeTransaction,
    raw: true
  })
}

const addTransaction = (
  partnerId: number,
  memberId: number,
  transactionPayload: TransactionCreationAttributes,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Transaction.create(
    { ...transactionPayload, partnerId, memberId },
    { transaction: sequelizeTransaction, raw: true }
  ).then((transaction) => transaction.get({ plain: true }))
}

const modifyTransaction = (
  partnerId: number,
  memberId: number,
  transactionId: number,
  transactionPayload: Partial<TransactionCreationAttributes>,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Transaction.update(transactionPayload, {
    where: { id: transactionId, partnerId, memberId },
    transaction: sequelizeTransaction,
    returning: true
  }).then(([, transactions]) => {
    return transactions?.[0]?.get({ plain: true })
  })
}

const removeTransaction = (
  partnerId: number,
  memberId: number,
  transactionId: number,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Transaction.destroy({ where: { id: transactionId, partnerId, memberId }, transaction: sequelizeTransaction })
}

export {
  countTransactions,
  findTransactions,
  findTransaction,
  findTransactionsByPartner,
  addTransaction,
  modifyTransaction,
  removeTransaction
}
