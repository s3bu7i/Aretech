import express, { type Request, type Response } from 'express'
import { Op } from 'sequelize'

import { Member, Partner, Transaction } from '@/db/models/index.ts'
import { logger } from '@/logger/index.ts'
import { adminAuthMiddleware } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/admin/partners', adminAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const partners = await Partner.findAll({ include: [{ model: Member }, { model: Transaction }] })

    logger.info(`[/admin/partners]: successfully retrieved partners`)

    return res.status(200).json({ partners })
  } catch (error) {
    logger.error(`[/admin/partners]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.get('/admin/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partners = await Partner.findByPk(parseInt(req.params.partnerId), {
      include: [{ model: Member }, { model: Transaction }]
    })

    logger.info(`[/admin/partners/${req.params.partnerId}]: successfully retrieved partners`)

    return res.status(200).json({ partners })
  } catch (error) {
    logger.error(`[/admin/partners/${req.params.partnerId}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.post('/admin/partners', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partner = await Partner.create(req.body, { include: [{ model: Member }, { model: Transaction }] })

    logger.info(`[/admin/partners]: successfully created partner`)

    return res.status(200).json({ partner })
  } catch (error) {
    logger.error(`[/admin/partners]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.post('/admin/partners/batch', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partners = await Partner.bulkCreate(req.body, { include: [{ model: Member }, { model: Transaction }] })

    logger.info(`[/admin/partners/batch]: successfully created partners`)

    return res.status(200).json({ partners })
  } catch (error) {
    logger.error(`[/admin/partners/batch]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.patch('/admin/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partners = await Partner.update(req.body, { where: { id: parseInt(req.params.partnerId) } })

    logger.info(`[/admin/partners/${req.params.partnerId}]: successfully updated partner`)

    return res.status(200).json({ partners })
  } catch (error) {
    logger.error(`[/admin/partners/${req.params.partnerId}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.patch('/admin/partners/batch/:partnerIds', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partners = await Partner.update(req.body, {
      where: { id: { [Op.in]: JSON.parse(req.params.partnerIds) as number[] } }
    })

    logger.info(`[/admin/partners/batch/${req.params.partnerIds}]: successfully updated partners`)

    return res.status(200).json({ partners })
  } catch (error) {
    logger.error(`[/admin/partners/batch/${req.params.partnerIds}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.delete('/admin/partners/:partnerId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partners = await Partner.destroy({ where: { id: parseInt(req.params.partnerId) } })

    logger.info(`[/admin/partners/${req.params.partnerId}]: successfully deleted partner`)

    return res.status(200).json({ partners })
  } catch (error) {
    logger.error(`[/admin/partners/${req.params.partnerId}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.delete('/admin/partners/batch/:partnerIds', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const partners = await Partner.destroy({
      where: { id: { [Op.in]: JSON.parse(req.params.partnerIds) as number[] } }
    })

    logger.info(`[/admin/partners/batch/${req.params.partnerIds}]: successfully deleted partners`)

    return res.status(200).json({ partners })
  } catch (error) {
    logger.error(`[/admin/partners/batch/${req.params.partnerIds}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

export { router as partnersAdminRouter }
