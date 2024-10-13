import express, { type Request, type Response } from 'express'

import {
  getPartnerTransactionController,
  getPartnerTransactionsController
} from '@/controllers/partner-transactions/index.ts'
import { logger } from '@/logger/index.ts'
import { partnerAuthMiddleware } from '@/middleware/index.ts'
import { partnerIdSchema, partnerIdTransactionIdSchema } from '@/routes/utils/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/loyalty/partners/:partnerId/transactions', partnerAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { partnerId } = partnerIdSchema.parse(req.params)

    const transactions = await getPartnerTransactionsController(req.partnerId as number, partnerId)

    logger.info(`[/loyalty/partners/${partnerId}/transactions]: successfully retrieved transactions`)

    return res.status(200).json({ transactions })
  } catch (error) {
    logger.error(`[/loyalty/partners/${req.params.partnerId}/transactions]: ${error}`)

    handleError(error as Error, res)
  }
})

router.get(
  '/loyalty/partners/:partnerId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { partnerId, transactionId } = partnerIdTransactionIdSchema.parse(req.params)

      const transaction = await getPartnerTransactionController(req.partnerId as number, partnerId, transactionId)

      logger.info(`[/loyalty/partners/${partnerId}/transactions/${transactionId}]: successfully retrieved transaction`)

      return res.status(200).json({ transaction })
    } catch (error) {
      logger.error(`[/loyalty/partners/${req.params.partnerId}/transactions/${req.params.transactionId}]: ${error}`)

      handleError(error as Error, res)
    }
  }
)

export { router as partnerTransactionsRouter }
