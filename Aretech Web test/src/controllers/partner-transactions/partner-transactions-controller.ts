import { findTransactionsByPartner } from '@/db/providers/index.ts'
import { NotFoundError, UnauthorizedError } from '@/utils/index.ts'

const getPartnerTransactionsController = async (requestingPartnerId: number, partnerId: number) => {
  if (requestingPartnerId !== partnerId) {
    throw new UnauthorizedError('Unauthorized')
  }

  return findTransactionsByPartner({}, partnerId)
}

const getPartnerTransactionController = async (
  requestingPartnerId: number,
  partnerId: number,
  transactionId: number
) => {
  if (requestingPartnerId !== partnerId) {
    throw new UnauthorizedError('Unauthorized')
  }

  const transactions = await findTransactionsByPartner({ id: transactionId }, partnerId)

  if (!transactions?.[0]) {
    throw new NotFoundError(`Transaction with id of ${transactionId} was not found!`)
  }

  return transactions[0]
}

export { getPartnerTransactionsController, getPartnerTransactionController }
