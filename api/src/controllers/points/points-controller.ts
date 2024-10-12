import { Transaction as SequelizeTransaction } from 'sequelize'

import { verifyMemberState, verifyPartnerState } from '@/controllers/utils/index.ts'
import { NotFoundError, runAsTransaction } from '@/utils/index.ts'
import { findMember } from '@/db/providers/index.ts'

const getPointsController = (memberId: number) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    // await verifyPartnerState(partnerId, sequelizeTransaction)

    // const member = await verifyMemberState(partnerId, memberId, sequelizeTransaction)

    const member = await findMember({}, 1, memberId, sequelizeTransaction);

    if (!member) {
      throw new NotFoundError(`Member with id of ${memberId} was not found!`)
    }

    return member.balance
  })
}


export { getPointsController }
