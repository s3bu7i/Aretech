import express, { type Request, type Response } from 'express'

import {
  deleteMemberTransactionController,
  getMemberTransactionController,
  getMemberTransactionsController,
  patchMemberTransactionController,
  postMemberTransactionController
} from '@/controllers/member-transactions/index.ts'
import { TransactionCreationAttributes } from '@/db/models/index.ts'
import { logger } from '@/logger/index.ts'
import { memberAuthMiddleware, partnerAuthMiddleware } from '@/middleware/index.ts'
import { patchTransaction, postTransaction } from '@/routes/member-transactions/index.ts'
import { memberIdSchema, memberIdTransactionIdSchema } from '@/routes/utils/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/transactions', memberAuthMiddleware, async (req: Request, res: Response) => {
  try {
    // const { memberId } = memberIdSchema.parse(req.params)
    const memberId = req.memberId;

    const transactions = await getMemberTransactionsController(1, memberId);

    logger.info(`[/loyalty/${memberId}/transactions]: successfully retrieved transactions`)

    return res.status(200).json({ transactions })
  } catch (error) {
    logger.error(`[/loyalty/${req.params.memberId}/transactions] error occurred:  ${error}`)

    handleError(error as Error, res)
  }
})

router.get(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { memberId, transactionId } = memberIdTransactionIdSchema.parse(req.params)

      const transaction = await getMemberTransactionController(req.partnerId as number, memberId, transactionId)

      logger.info(`[/loyalty/${memberId}/transactions/${transactionId}]: successfully retrieved transaction`)

      return res.status(200).json({ transaction })
    } catch (error) {
      logger.error(
        `[/loyalty/${req.params.memberId}/transactions/${req.params.transactionId}] error occurred: ${error}`
      )

      handleError(error as Error, res)
    }
  }
)

router.post('/loyalty/:memberId/transactions', memberAuthMiddleware, async (req: Request, res: Response) => {
  try {
    // const { memberId } = memberIdSchema.parse(req.params)
    const memberId = req.memberId!;
    const transactionPayload = postTransaction.parse(req.body)

    const transaction = await postMemberTransactionController(
      1, // only partner
      memberId,
      transactionPayload as TransactionCreationAttributes
    )

    logger.info(`[/loyalty/${memberId}/transactions]: successfully created transaction`)

    return res.status(200).json({ transaction })
  } catch (error) {
    logger.error(`[/loyalty/${req.params.memberId}/transactions] error occurred:  ${error}`)

    handleError(error as Error, res)
  }
})

router.patch(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { memberId, transactionId } = memberIdTransactionIdSchema.parse(req.params)
      const transactionPayload = patchTransaction.parse(req.body)

      const transaction = await patchMemberTransactionController(
        req.partnerId as number,
        memberId,
        transactionId,
        transactionPayload as TransactionCreationAttributes
      )

      logger.info(`[/loyalty/${memberId}/transactions/${transactionId}]: successfully updated transaction`)

      return res.status(200).json({ transaction })
    } catch (error) {
      logger.error(
        `[/loyalty/${req.params.memberId}/transactions/${req.params.transactionId}] error occurred:  ${error}`
      )

      handleError(error as Error, res)
    }
  }
)

router.delete(
  '/loyalty/:memberId/transactions/:transactionId',
  partnerAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { memberId, transactionId } = memberIdTransactionIdSchema.parse(req.params)

      const count = await deleteMemberTransactionController(req.partnerId as number, memberId, transactionId)

      logger.info(`[/loyalty/${memberId}/transactions/${transactionId}]: successfully deleted transaction`)

      return res.status(200).json({ count })
    } catch (error) {
      logger.error(
        `[/loyalty/${req.params.memberId}/transactions/${req.params.transactionId}] error occurred:  ${error}`
      )

      handleError(error as Error, res)
    }
  }
)

export { router as memberTransactionRouter }
