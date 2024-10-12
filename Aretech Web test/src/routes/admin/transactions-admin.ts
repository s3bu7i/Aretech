import express, { type Request, type Response } from 'express'
import { Op } from 'sequelize'

import { Member, Partner, Transaction } from '@/db/models/index.ts'
import { logger } from '@/logger/index.ts'
import { adminAuthMiddleware } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/admin/transactions', adminAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const transactions = await Transaction.findAll({ include: [{ model: Partner }, { model: Member }] })

    logger.info(`[/admin/transactions]: successfully retrieved transactions`)

    return res.status(200).json({ transactions })
  } catch (error) {
    logger.error(`[/admin/transactions]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.get('/admin/transactions/:transactionId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.findByPk(parseInt(req.params.transactionId), {
      include: [{ model: Partner }, { model: Member }]
    })

    logger.info(`[/admin/transactions/${req.params.transactionId}]: successfully retrieved transactions`)

    return res.status(200).json({ transactions })
  } catch (error) {
    logger.error(`[/admin/transactions/${req.params.transactionId}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.post('/admin/transactions', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.create(req.body, { include: [{ model: Partner }, { model: Member }] })

    logger.info(`[/admin/transactions]: successfully created transaction`)

    return res.status(200).json({ transaction })
  } catch (error) {
    logger.error(`[/admin/transactions]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.post('/admin/transactions/batch', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.bulkCreate(req.body, { include: [{ model: Partner }, { model: Member }] })

    logger.info(`[/admin/transactions/batch]: successfully created transactions`)

    return res.status(200).json({ transactions })
  } catch (error) {
    logger.error(`[/admin/transactions/batch]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.patch('/admin/transactions/:transactionId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.update(req.body, { where: { id: parseInt(req.params.transactionId) } })

    logger.info(`[/admin/transactions/${req.params.transactionId}]: successfully updated transaction`)

    return res.status(200).json({ transactions })
  } catch (error) {
    logger.error(`[/admin/transactions/${req.params.transactionId}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.patch('/admin/transactions/batch/:transactionIds', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.update(req.body, {
      where: { id: { [Op.in]: JSON.parse(req.params.transactionIds) as number[] } }
    })

    logger.info(`[/admin/transactions/batch/${req.params.transactionIds}]: successfully updated transactions`)

    return res.status(200).json({ transactions })
  } catch (error) {
    logger.error(`[/admin/transactions/batch/${req.params.transactionIds}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.delete('/admin/transactions/:transactionId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.destroy({ where: { id: parseInt(req.params.transactionId) } })

    logger.info(`[/admin/transactions/${req.params.transactionId}]: successfully deleted transaction`)

    return res.status(200).json({ transactions })
  } catch (error) {
    logger.error(`[/admin/transactions/${req.params.transactionId}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.delete('/admin/transactions/batch/:transactionIds', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.destroy({
      where: { id: { [Op.in]: JSON.parse(req.params.transactionIds) as number[] } }
    })

    logger.info(`[/admin/transactions/batch/${req.params.transactionIds}]: successfully deleted transactions`)

    return res.status(200).json({ transactions })
  } catch (error) {
    logger.error(`[/admin/transactions/batch/${req.params.transactionIds}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

export { router as transactionsAdminRouter }
