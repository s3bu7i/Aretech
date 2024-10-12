import { Transaction as SequelizeTransaction } from 'sequelize'

import { MEMBER_STATUS } from '@/constants/members.ts'
import { findMember } from '@/db/providers/index.ts'
import { NotFoundError, ValidationError } from '@/utils/index.ts'

const verifyMemberState = async (partnerId: number, memberId: number, sequelizeTransaction: SequelizeTransaction) => {
  const member = await findMember({}, partnerId, memberId, sequelizeTransaction)

  if (!member) {
    throw new NotFoundError(`Member with id of ${memberId} not found!`)
  }

  if (member.status !== MEMBER_STATUS.ACTIVE) {
    throw new ValidationError(`Cannot perform this action because member with id of ${memberId} is ${member.status}!`)
  }

  return member
}

export { verifyMemberState }
