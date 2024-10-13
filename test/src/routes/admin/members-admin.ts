import express, { type Request, type Response } from 'express'
import { Op } from 'sequelize'

import { Member, Partner, Transaction } from '@/db/models/index.ts'
import { logger } from '@/logger/index.ts'
import { adminAuthMiddleware } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/admin/members', adminAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const members = await Member.findAll({ include: [{ model: Partner }, { model: Transaction }] })

    logger.info(`[/admin/members]: successfully retrieved members`)

    return res.status(200).json({ members })
  } catch (error) {
    logger.error(`[/admin/members]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.get('/admin/members/:memberId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const members = await Member.findByPk(parseInt(req.params.memberId), {
      include: [{ model: Partner }, { model: Transaction }]
    })

    logger.info(`[/admin/members/${req.params.memberId}]: successfully retrieved members`)

    return res.status(200).json({ members })
  } catch (error) {
    logger.error(`[/admin/members/${req.params.memberId}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.post('/admin/members', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const member = await Member.create(req.body, { include: [{ model: Partner }, { model: Transaction }] })

    logger.info(`[/admin/members]: successfully created member`)

    return res.status(200).json({ member })
  } catch (error) {
    logger.error(`[/admin/members]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.post('/admin/members/batch', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const members = await Member.bulkCreate(req.body, { include: [{ model: Partner }, { model: Transaction }] })

    logger.info(`[/admin/members/batch]: successfully created members`)

    return res.status(200).json({ members })
  } catch (error) {
    logger.error(`[/admin/members/batch]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.patch('/admin/members/:memberId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const members = await Member.update(req.body, { where: { id: parseInt(req.params.memberId) } })

    logger.info(`[/admin/members/${req.params.memberId}]: successfully updated member`)

    return res.status(200).json({ members })
  } catch (error) {
    logger.error(`[/admin/members/${req.params.memberId}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.patch('/admin/members/batch/:memberIds', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const members = await Member.update(req.body, {
      where: { id: { [Op.in]: JSON.parse(req.params.memberIds) as number[] } }
    })

    logger.info(`[/admin/members/batch/${req.params.memberIds}]: successfully updated members`)

    return res.status(200).json({ members })
  } catch (error) {
    logger.error(`[/admin/members/batch/${req.params.memberIds}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.delete('/admin/members/:memberId', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const members = await Member.destroy({ where: { id: parseInt(req.params.memberId) } })

    logger.info(`[/admin/members/${req.params.memberId}]: successfully deleted member`)

    return res.status(200).json({ members })
  } catch (error) {
    logger.error(`[/admin/members/${req.params.memberId}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

router.delete('/admin/members/batch/:memberIds', adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const members = await Member.destroy({
      where: { id: { [Op.in]: JSON.parse(req.params.memberIds) as number[] } }
    })

    logger.info(`[/admin/members/batch/${req.params.memberIds}]: successfully deleted members`)

    return res.status(200).json({ members })
  } catch (error) {
    logger.error(`[/admin/members/batch/${req.params.memberIds}]: error occurred ${error}`)

    handleError(error as Error, res)
  }
})

export { router as membersAdminRouter }
