import express, { type Request, type Response } from 'express'

import { getPointsController } from '@/controllers/points/index.ts'
import { memberAuthMiddleware } from '@/middleware/index.ts'
import { memberIdSchema } from '@/routes/utils/index.ts'
import { handleError, InternalServerError, NotFoundError, runAsTransaction, ValidationError } from '@/utils/index.ts'
import { Member } from '@/db/models/member.ts'
// import { postMemberTransactionController } from '@/controllers/member-transactions/index.ts'
import { Transaction as SequelizeTransaction } from 'sequelize';
import { TransactionCreationAttributes } from '@/db/models/index.ts'
import { addTransaction, countTransactions, modifyMember } from '@/db/providers/index.ts'
import { verifyMemberState, verifyPartnerState } from '@/controllers/utils/index.ts'

const router = express.Router()

router.get('/loyalty/:memberId/points', memberAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const memberId = req.memberId;

    const balance = await getPointsController(memberId!)

    return res.status(200).json({ balance })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.get('/loyalty/:memberId/transit', memberAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const memberId = req.memberId!;

    const member = await Member.increment('balance', {
      by: 1000,
      where: {
        id: memberId
      }
    });
    
    const transactionPayload = {
      category: "Transit",
      description: `Used public transit`,
      points: 1000,
      // amount: 5000,
      rewardId: 10,
      amount: -1000,
    } as TransactionCreationAttributes;

    await runAsTransaction(async (sequelizeTransaction: SequelizeTransaction) => {
      const transactionsCount = await countTransactions({}, 1, memberId, sequelizeTransaction)
  
      if (transactionsCount >= parseInt(process.env.MAX_TRANSACTIONS_PER_MEMBER as string)) {
        throw new ValidationError(`You have reached the max amount of transactions for partner with id of ${1}`)
      }
  
      await verifyPartnerState(1, sequelizeTransaction)
  
      const member = await verifyMemberState(1, memberId, sequelizeTransaction)
  
      console.log("balance", member.balance, transactionPayload.amount);
  
      if (member.balance - transactionPayload.amount < 0) {
        throw new ValidationError('Member balance cannot go below zero!')
      }
  
      const transaction = await addTransaction(1, memberId, transactionPayload, sequelizeTransaction)
  
      if (!transaction) {
        throw new InternalServerError('Transaction could not be created!')
      }
    });

    return res.status(200).json({ balance: member[0][0].balance });
  } catch (error) {
    handleError(error as Error, res);
  }
})

router.get('/loyalty/leaderboard', async (req: Request, res: Response) => {
  try {
    const members = await Member.findAll({
      limit: 10,
      order: [['balance', 'DESC']],
      attributes: ["name", "balance", "animal"]
    });

    return res.status(200).json(members);
  } catch (error) {
    handleError(error as Error, res);
  }
})

export { router as pointsRouter }
