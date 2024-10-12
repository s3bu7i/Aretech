import { Transaction as SequelizeTransaction } from 'sequelize'

import { sequelize } from '@/db/index.ts'

const runAsTransaction = async <Type>(
  callback: (sequelizeTransaction: SequelizeTransaction) => Promise<Type>
): Promise<Type> => {
  return sequelize.transaction(async (sqlTxn: SequelizeTransaction) => callback(sqlTxn))
}

export { runAsTransaction }
