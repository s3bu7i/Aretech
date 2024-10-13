import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { logger } from '@/logger/index.ts'
import { partnerAuthHandler } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const partnerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    partnerAuthHandler(req, process.env.JWT_SECRET as jwt.Secret)

    logger.info('[partnerAuthMiddleware]: successfully authorized partner request')

    next()
  } catch (error) {
    logger.error('[partnerAuthMiddleware]: partner request failed authorization')

    handleError(error as Error, res)
  }
}

export { partnerAuthMiddleware }
