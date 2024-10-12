import express, { type Request, Response } from 'express'

import { getRewardsController } from '@/controllers/rewards/index.ts'
import { Member, Rewards } from '@/db/models/index.ts'
import { memberAuthMiddleware } from '@/middleware/index.ts'
// import { memberAuthMiddleware } from '@/middleware/index.ts'
import { handleError } from '@/utils/index.ts'

const router = express.Router()

router.get('/rewards/getAll', async (req: Request, res: Response) => {
  try {
    const rewards = await getRewardsController()

    return res.status(200).json({ rewards })
  } catch (error) {
    handleError(error as Error, res)
  }
})

router.get('/rewards/test', async (req: Request, res: Response) => {
  try {
    // const rewards = [
    //   {
    //     name: 'Transit award',
    //     points: 1000,
    //     category: 'Transportation',
    //     company: 'Transit Company',
    //     description: 'Award for using public transit.',
    //     image: 'https://example.com/transit-award.png'
    //   },
    //   {
    //     name: 'Receipt award',
    //     points: Math.floor(Math.random() * 5000) + 1000,
    //     category: 'Miscellaneous',
    //     company: 'Various',
    //     description: 'Award based on receipt submissions.',
    //     image: 'https://example.com/receipt-award.png'
    //   }
    // ]

    // const createdRewards = await Rewards.bulkCreate(rewards)

    res.status(201).json({ message: 'Rewards created successfully', rewards: createdRewards })
  } catch (error) {
    console.error('Error creating rewards:', error)
    res.status(500).json({ error: 'Failed to create rewards' })
  }
})

// router.get('/loyalty/:memberId/transit', memberAuthMiddleware, async (req: Request, res: Response) => {
//   try {
//     const memberId = req.memberId;

//     const balance = await Member.increment('balance', {
//       by: 1000,
//       where: {
//         id: memberId
//       }
//     })

//     return res.status(200).json({ balance });
//   } catch (error) {
//     handleError(error as Error, res);
//   }
// })

export { router as rewardsRouter }
