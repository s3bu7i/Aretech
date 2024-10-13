import { Transaction as SequelizeTransaction } from 'sequelize'

import { PARTNER_PERMISSIONS, PARTNER_STATUS } from '@/constants/index.ts'
import { findPartner } from '@/db/providers/index.ts'
import { NotFoundError, ValidationError } from '@/utils/index.ts'

const verifyPartnerState = async (partnerId: number, sequelizeTransaction: SequelizeTransaction) => {
  const partner = await findPartner({}, partnerId, true, sequelizeTransaction)

  if (!partner) {
    throw new NotFoundError(`Partner with id of ${partnerId} not found!`)
  }

  if (partner.status !== PARTNER_STATUS.ACTIVE) {
    throw new ValidationError(
      `Cannot perform this action because partner with id of ${partnerId} is ${partner.status}!`
    )
  }

  if (partner.permission === PARTNER_PERMISSIONS.READ) {
    throw new ValidationError(
      `Cannot perform this action because partner with id of ${partnerId} is ${partner.permission} only!`
    )
  }

  return partner
}

export { verifyPartnerState }
