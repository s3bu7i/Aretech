import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { Partner } from '@/db/models/index.ts'
import { findPartnerByEmail } from '@/db/providers/index.ts'
import { ForbiddenError, NotFoundError } from '@/utils/index.ts'

const adminAuthController = async (email: string, password: string) => {
  if (email !== (process.env.ADMIN_EMAIL as string)) {
    throw new NotFoundError(`Admin with email of ${email} does not exist!`)
  }

  const isPasswordCorrect = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH as string)

  if (!isPasswordCorrect) {
    throw new ForbiddenError(`Incorrect credentials!`)
  }

  return jwt.sign(
    { id: process.env.ADMIN_ID as string, email: process.env.ADMIN_EMAIL as string },
    process.env.JWT_ADMIN_SECRET as jwt.Secret,
    { expiresIn: '30m' }
  )
}

const partnerAuthController = async (email: string, password: string) => {
  const partner = await findPartnerByEmail(email, false)

  if (!partner) {
    throw new NotFoundError(`Partner with email of ${email} does not exist!`)
  }

  const isPasswordCorrect = await bcrypt.compare(password, partner.password)

  if (!isPasswordCorrect) {
    throw new ForbiddenError(`Incorrect credentials, please contact #2024-rbc slack channel for your credentials!`)
  }

  const sanitizedPartner = partner as Partial<Partner>

  delete sanitizedPartner.password

  return jwt.sign(sanitizedPartner, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '30m'
  })
}

export { adminAuthController, partnerAuthController }
