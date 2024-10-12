import { sequelize } from '@/db/index.ts'

const healthController = async () => {
  const authenticated = await sequelize.authenticate()
  const validated = await sequelize.validate()

  return Boolean(authenticated) && Boolean(validated)
}

export { healthController }
