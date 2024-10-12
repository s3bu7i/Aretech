import { config } from 'dotenv'

import { logger } from '@/logger/index.ts'
import { app } from '@/server/index.ts'

config()

const port = process.env.PORT ?? 3000

const server = app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})

const handleServerTermination = () => {
  server.close(() => {
    process.exit(process.exitCode ?? 0)
  })

  setTimeout(() => process.exit(process.exitCode ?? 1), 10000).unref()
}

process.on('SIGINT', handleServerTermination)
process.on('SIGTERM', handleServerTermination)
