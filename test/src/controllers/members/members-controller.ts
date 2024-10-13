import { Transaction as SequelizeTransaction } from 'sequelize'

import { verifyPartnerState } from '@/controllers/utils/index.ts'
import { MemberCreationAttributes } from '@/db/models/index.ts'
import { addMember, countMembers, findMember, findMembers, modifyMember, removeMember } from '@/db/providers/index.ts'
import { InternalServerError, NotFoundError, ValidationError, runAsTransaction } from '@/utils/index.ts'

const getMembersController = async (partnerId: number) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    await verifyPartnerState(partnerId, sequelizeTransaction)

    return findMembers({}, partnerId, sequelizeTransaction)
  })
}

const getMemberController = (partnerId: number, memberId: number) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    await verifyPartnerState(partnerId, sequelizeTransaction)

    const member = await findMember({}, partnerId, memberId, sequelizeTransaction)

    if (!member) {
      throw new NotFoundError(`Member with id of ${memberId} was not found!`)
    }

    return member
  })
}

const postMemberController = (partnerId: number, memberPayload: MemberCreationAttributes) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    const membersCount = await countMembers({}, partnerId, sequelizeTransaction)

    if (membersCount >= parseInt(process.env.MAX_MEMBERS_PER_PARTNER as string)) {
      throw new ValidationError(`You have reached the max amount of transactions for partner with id of ${partnerId}`)
    }

    await verifyPartnerState(partnerId, sequelizeTransaction)

    const member = await addMember(partnerId, memberPayload, sequelizeTransaction)

    if (!member) {
      throw new NotFoundError(`Member for partner with id of ${partnerId} could not be created!`)
    }

    return member
  })
}

const patchMemberController = (partnerId: number, memberId: number, memberPayload: MemberCreationAttributes) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    await verifyPartnerState(partnerId, sequelizeTransaction)

    const member = await modifyMember(partnerId, memberId, memberPayload, sequelizeTransaction)

    if (!member) {
      throw new NotFoundError(`Member with id of ${memberId} could not be updated!`)
    }

    return member
  })
}

const deleteMemberController = (partnerId: number, memberId: number) => {
  return runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
    await verifyPartnerState(partnerId, sequelizeTransaction)

    const count = await removeMember(partnerId, memberId, sequelizeTransaction)

    if (count === 0) {
      throw new InternalServerError(`No member with id of ${memberId} was deleted!`)
    }

    return count
  })
}

export {
  deleteMemberController,
  getMemberController,
  getMembersController,
  patchMemberController,
  postMemberController
}
