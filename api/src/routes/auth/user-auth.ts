import express, { type Request, type Response } from 'express'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { userSignupController, userLoginController } from '@/controllers/auth/index.ts'
import { logger } from '@/logger/index.ts'
import { handleError, zodCredentials } from '@/utils/index.ts'
import { AnimalType } from '@/db/models/user.ts'

const router = express.Router()

router.post('/user-signup', async (req: Request, res: Response) => {
  try {
    // console.log(zodCredentials.extend({
    //   animal: z.string(),
    //   name: z.string()
    // }).safeParse(req.body));
    const { name, email, password, animal } = zodCredentials.extend({
      animal: z.string(),
      name: z.string()
    }).parse(req.body)

    const result = await userSignupController(name, email, password, animal)

    logger.info(`[/user-signup]: successfully created user with email ${email}`)

    return res.status(201).json(result)
  } catch (error) {
    logger.error(`[/user-signup]: user signup attempt failed`)

    handleError(error as Error, res)
  }
})

router.post('/user-login', async (req: Request, res: Response) => {
  try {
    const { email, password } = zodCredentials.parse(req.body)

    const { token } = await userLoginController(email, password)

    logger.info(`[/user-login]: successfully logged in user with email ${email}`)

    return res.status(200).json({ token })
  } catch (error) {
    logger.error(`[/user-login]: user login attempt failed`)

    handleError(error as Error, res)
  }
})

export { router as userAuthRouter }