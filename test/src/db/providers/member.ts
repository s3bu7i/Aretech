import { Transaction as SequelizeTransaction, WhereOptions } from 'sequelize'

import { Member, MemberCreationAttributes } from '@/db/models/index.ts'

const countMembers = (where: WhereOptions<Member>, partnerId: number, sequelizeTransaction?: SequelizeTransaction) => {
  return Member.count({ where: { ...where, partnerId }, transaction: sequelizeTransaction })
}

const findMembers = (where: WhereOptions<Member>, partnerId: number, sequelizeTransaction?: SequelizeTransaction) => {
  return Member.findAll({ where: { ...where, partnerId }, transaction: sequelizeTransaction, raw: true })
}

const findMember = (
  where: WhereOptions<Member>,
  partnerId: number,
  memberId: number,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Member.findOne({ where: { ...where, id: memberId, partnerId }, transaction: sequelizeTransaction, raw: true })
}

const addMember = (
  partnerId: number,
  memberPayload: MemberCreationAttributes,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Member.create({ ...memberPayload, partnerId }, { transaction: sequelizeTransaction, raw: true }).then(
    (member) => member.get({ plain: true })
  )
}

const modifyMember = (
  partnerId: number,
  memberId: number,
  memberPayload: Partial<MemberCreationAttributes>,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Member.update(memberPayload, {
    where: { id: memberId, partnerId },
    transaction: sequelizeTransaction,
    returning: true
  }).then(([, members]) => {
    return members?.[0]?.get({ plain: true })
  })
}

const removeMember = (partnerId: number, memberId: number, sequelizeTransaction?: SequelizeTransaction) => {
  return Member.destroy({ where: { id: memberId, partnerId }, transaction: sequelizeTransaction })
}

export { countMembers, findMembers, findMember, addMember, modifyMember, removeMember }
