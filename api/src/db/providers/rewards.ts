import { Transaction as SequelizeTransaction, WhereOptions } from 'sequelize'

import { Rewards, RewardsCreationAttributes } from '@/db/models/index.ts'

const countRewards = (where: WhereOptions<Rewards>, companyName: string, sequelizeTransaction?: SequelizeTransaction) => {
  return Rewards.count({ where: { ...where, company: companyName }, transaction: sequelizeTransaction })
}

const findRewards = (where?: WhereOptions<Rewards>, sequelizeTransaction?: SequelizeTransaction) => {
  return Rewards.findAll({ where: { ...where }, transaction: sequelizeTransaction })
}

const findReward = (
  where: WhereOptions<Rewards>,
  companyName: string,
  rewardId: number,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Rewards.findOne({
    where: { ...where, id: rewardId, company: companyName },
    transaction: sequelizeTransaction,
    raw: true
  })
}

const addReward = (
  companyName: string,
  rewardPayload: RewardsCreationAttributes,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Rewards.create(
    { ...rewardPayload, company: companyName },
    { transaction: sequelizeTransaction, raw: true }
  ).then((reward) => reward.get({ plain: true }))
}

const modifyReward = (
  companyName: string,
  rewardId: number,
  rewardPayload: Partial<RewardsCreationAttributes>,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Rewards.update(rewardPayload, {
    where: { id: rewardId, company: companyName },
    transaction: sequelizeTransaction,
    returning: true
  }).then(([, rewards]) => {
    return rewards?.[0]?.get({ plain: true })
  })
}

const removeReward = (companyName: string, rewardId: number, sequelizeTransaction?: SequelizeTransaction) => {
  return Rewards.destroy({ where: { id: rewardId, company: companyName }, transaction: sequelizeTransaction })
}

export { countRewards, findRewards, findReward, addReward, modifyReward, removeReward }