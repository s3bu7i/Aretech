import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { logger } from '@/logger/index.ts'
import { adminAuthHandler } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    adminAuthHandler(req, process.env.JWT_ADMIN_SECRET as jwt.Secret)

    logger.info('[adminAuthMiddleware]: successfully authorized admin request')

    next()
  } catch (error) {
    logger.error('[adminAuthMiddleware]: admin request failed authorization')

    handleError(error as Error, res)
  }
}

export { adminAuthMiddleware }
