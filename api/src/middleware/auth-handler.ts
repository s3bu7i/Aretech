import type { Request } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError } from '@/utils/index.ts'

const baseAuthHandler = (req: Request, jwtSecret: jwt.Secret) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw new ForbiddenError('Bearer token not found!')
  }

  const decodedToken = jwt.verify(token, jwtSecret) as jwt.JwtPayload

  if (!decodedToken?.id) {
    throw new ForbiddenError('Invalid JWT token!')
  }

  return decodedToken.id
}

const partnerAuthHandler = (req: Request, jwtSecret: jwt.Secret) => {
  req.partnerId = baseAuthHandler(req, jwtSecret) as number

  if (!req.partnerId) {
    throw new ForbiddenError('Invalid partner id provided in the payload!')
  }

  return req
}

const memberAuthHandler = (req: Request, jwtSecret: jwt.Secret) => {
  req.memberId = baseAuthHandler(req, jwtSecret) as number

  if (!req.memberId) {
    throw new ForbiddenError('Invalid member id provided in the payload!')
  }

  return req
}

const adminAuthHandler = (req: Request, jwtSecret: jwt.Secret) => {
  req.adminId = baseAuthHandler(req, jwtSecret) as string

  if (!req.adminId) {
    throw new ForbiddenError('Invalid admin id provided in the payload!')
  }

  return req
}

export { adminAuthHandler, partnerAuthHandler, memberAuthHandler }
