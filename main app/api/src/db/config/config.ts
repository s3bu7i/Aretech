import { config } from 'dotenv'
import { SequelizeOptions } from 'sequelize-typescript'

config()

const SEQUELIZE_CONFIG: SequelizeOptions = {
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  ...(process.env.NODE_ENV === 'production' && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true
      }
    }
  })
}

export { SEQUELIZE_CONFIG }
