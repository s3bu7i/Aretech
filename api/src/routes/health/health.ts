import express, { type Request, type Response } from 'express'

import { healthController } from '@/controllers/health/index.ts'
import { logger } from '@/logger/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/health', async (_: Request, res: Response) => {
  try {
    const isHealthy = await healthController()

    logger.info('[/health]: database check succeeded')

    return res.status(200).json({ status: 'SUCCESS', message: 'Database Healthy', error: isHealthy })
  } catch (error) {
    logger.error('[/health]: database check failed')

    handleError(error as Error, res)
  }
})

export { router as healthRouter }
