/* eslint-disable @typescript-eslint/no-require-imports */
require('ts-node/register')
require('dotenv').config()

module.exports = {
  port: process.env.DB_PORT,
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
