import type { Request } from 'express'
import { rateLimit } from 'express-rate-limit'

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: process.env.RATE_LIMIT_MAX_REQUESTS as unknown as number,
  message: 'Too many requests, please try again later...',
  standardHeaders: true,
  windowMs: 15 * 60 * (process.env.RATE_LIMIT_WINDOW_MS as unknown as number),
  keyGenerator: (req: Request) => req.ip as string
})

export { rateLimiter }
