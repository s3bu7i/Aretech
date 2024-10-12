import { Transaction as SequelizeTransaction, WhereOptions } from 'sequelize'

import { Partner, PartnerCreationAttributes } from '@/db/models/index.ts'

const findPartners = (where: WhereOptions<Partner>, sequelizeTransaction?: SequelizeTransaction) => {
  return Partner.findAll({ where, attributes: { exclude: ['password'] }, transaction: sequelizeTransaction, raw: true })
}

const findPartner = (
  where: WhereOptions<Partner>,
  partnerId: number,
  excludePassword: boolean,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Partner.findOne({
    where: { ...where, id: partnerId },
    attributes: { exclude: excludePassword ? ['password'] : [] },
    transaction: sequelizeTransaction,
    raw: true
  })
}

const findPartnerByEmail = (email: string, excludePassword: boolean, sequelizeTransaction?: SequelizeTransaction) => {
  return Partner.findOne({
    where: { email },
    attributes: { exclude: excludePassword ? ['password'] : [] },
    transaction: sequelizeTransaction,
    raw: true
  })
}

const addPartner = (partnerPayload: PartnerCreationAttributes, sequelizeTransaction?: SequelizeTransaction) => {
  return Partner.create(partnerPayload, { transaction: sequelizeTransaction, raw: true }).then((partner) => {
    return partner.get({ plain: true })
  })
}

const modifyPartner = (
  partnerId: number,
  partnerPayload: Partial<PartnerCreationAttributes>,
  sequelizeTransaction?: SequelizeTransaction
) => {
  return Partner.update(partnerPayload, {
    where: { id: partnerId },
    transaction: sequelizeTransaction,
    returning: true
  }).then(([, partners]) => {
    return partners?.[0]?.get({ plain: true })
  })
}

const removePartner = (partnerId: number, sequelizeTransaction?: SequelizeTransaction) => {
  return Partner.destroy({ where: { id: partnerId }, transaction: sequelizeTransaction })
}

export { findPartners, findPartner, findPartnerByEmail, addPartner, modifyPartner, removePartner }
