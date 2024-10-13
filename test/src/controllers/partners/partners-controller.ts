import { Partner, PartnerCreationAttributes } from '@/db/models/index.ts'
import { addPartner, findPartner, findPartners, modifyPartner, removePartner } from '@/db/providers/index.ts'
import { NotFoundError } from '@/utils/index.ts'

const getPartnersController = async () => {
  return findPartners({})
}

const getPartnerController = async (partnerId: number) => {
  const partner = await findPartner({}, partnerId, true)

  if (!partner) {
    throw new NotFoundError(`Partner with id of ${partnerId} was not found!`)
  }

  return partner
}

const postPartnerController = async (partnerPayload: PartnerCreationAttributes) => {
  const partner = await addPartner(partnerPayload)

  if (!partner) {
    throw new NotFoundError(`Partner could not be created!`)
  }

  const sanitizedPartner = partner as Partial<Partner>

  delete sanitizedPartner.password

  return sanitizedPartner
}

const patchPartnerController = async (partnerId: number, partnerPayload: PartnerCreationAttributes) => {
  const partner = await modifyPartner(partnerId, partnerPayload)

  if (!partner) {
    throw new NotFoundError(`Partner with id of ${partnerId} could not be updated!`)
  }

  const sanitizedPartner = partner as Partial<Partner>

  delete sanitizedPartner.password

  return sanitizedPartner
}

const deletePartnerController = async (partnerId: number) => {
  const count = await removePartner(partnerId)

  if (!count) {
    throw new NotFoundError(`Partner with id of ${partnerId} could not be deleted!`)
  }

  return count
}

export {
  deletePartnerController,
  getPartnerController,
  getPartnersController,
  patchPartnerController,
  postPartnerController
}
