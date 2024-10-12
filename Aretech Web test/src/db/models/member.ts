import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

import { MEMBER_STATUS, addressRegex, nameRegex, phoneRegex } from '@/constants/index.ts'
import { sequelize } from '@/db/index.ts'
import { Partner, Transaction } from '@/db/models/index.ts'
import { zodDateSchema, zodIdSchema } from '@/utils/index.ts'

extendZodWithOpenApi(z)

interface MemberAttributes {
  id: number
  partnerId: number
  name: string
  address: string
  phone: string
  email: string
  balance: number
  status: keyof typeof MEMBER_STATUS
  createdAt: Date
  updatedAt: Date
}

type MemberCreationAttributes = Optional<MemberAttributes, 'id' | 'partnerId' | 'createdAt' | 'updatedAt' | 'status'>

class Member extends Model<MemberAttributes, MemberCreationAttributes> {
  declare id: number
  declare partnerId: number
  declare name: string
  declare address: string
  declare phone: string
  declare email: string
  declare balance: number
  declare status: keyof typeof MEMBER_STATUS
  declare createdAt: Date
  declare updatedAt: Date

  static associate(models: { Partner: typeof Partner; Transaction: typeof Transaction }) {
    Member.belongsTo(models.Partner, {
      foreignKey: 'partnerId',
      onDelete: 'CASCADE'
    })
    Member.hasMany(models.Transaction, {
      foreignKey: 'partnerId',
      onDelete: 'CASCADE'
    })
  }
}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        isInt: true
      },
      field: 'id'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Partner,
        key: 'id'
      },
      onDelete: 'CASCADE',
      validate: {
        isInt: true
      },
      field: 'partner_id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: nameRegex,
        len: [2, 50]
      },
      field: 'name'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: addressRegex,
        len: [2, 255]
      },
      field: 'address'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: phoneRegex,
        len: [2, 25]
      },
      field: 'phone'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      field: 'email'
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true
      },
      field: 'balance'
    },
    status: {
      type: DataTypes.ENUM(...Object.values(MEMBER_STATUS)),
      allowNull: false,
      defaultValue: MEMBER_STATUS.PENDING,
      values: Object.values(MEMBER_STATUS),
      validate: {
        is: nameRegex
      },
      field: 'status'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'updated_at'
    }
  },
  {
    modelName: 'member',
    tableName: 'members',
    timestamps: true,
    sequelize
  }
)

const MemberZod = z.object({
  id: zodIdSchema,
  partnerId: zodIdSchema,
  name: z.string().regex(nameRegex).openapi({ example: 'John Doe' }),
  address: z.string().regex(addressRegex).openapi({ example: '123 Main St, Toronto, ON' }),
  phone: z.string().regex(phoneRegex).openapi({ example: '4161234567' }),
  email: z.string().email().openapi({ example: 'member@example.com' }),
  balance: z.number().int().openapi({ example: 1000 }),
  status: z
    .enum([MEMBER_STATUS.PENDING, ...Object.values(MEMBER_STATUS).slice(1)])
    .default(MEMBER_STATUS.PENDING)
    .optional()
    .openapi({ example: MEMBER_STATUS.PENDING }),
  createdAt: zodDateSchema,
  updatedAt: zodDateSchema
})

export { Member, MemberZod, type MemberAttributes, type MemberCreationAttributes }
