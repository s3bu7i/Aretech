import express, { type Request, type Response } from 'express'

import { adminAuthController } from '@/controllers/auth/index.ts'
import { logger } from '@/logger/index.ts'
import { handleError, zodCredentials } from '@/utils/index.ts'

const router = express.Router()

router.post('/admin-auth', async (req: Request, res: Response) => {
  try {
    const { email, password } = zodCredentials.parse(req.body)

    const accessToken = await adminAuthController(email, password)

    logger.info(`[/admin-auth]: successfully authenticated admin user`)

    return res.status(200).json({ accessToken })
  } catch (error) {
    logger.error(`[/admin-auth]: admin user authentication attempt failed`)

    handleError(error as Error, res)
  }
})

export { router as adminAuthRouter }
