import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

import {
  PARTNER_PERMISSIONS,
  PARTNER_STATUS,
  addressRegex,
  nameRegex,
  phoneRegex,
  textRegex
} from '@/constants/index.ts'
import { sequelize } from '@/db/index.ts'
import { Member, Transaction } from '@/db/models/index.ts'
import { zodDateSchema, zodIdSchema } from '@/utils/index.ts'

extendZodWithOpenApi(z)

interface PartnerAttributes {
  id: number
  status: keyof typeof PARTNER_STATUS
  name: string
  description: string
  address: string
  phone: string
  email: string
  permission: keyof typeof PARTNER_PERMISSIONS
  password: string
  createdAt: Date
  updatedAt: Date
}

type PartnerCreationAttributes = Optional<PartnerAttributes, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'permission'>

class Partner extends Model<PartnerAttributes, PartnerCreationAttributes> {
  declare id: number
  declare status: keyof typeof PARTNER_STATUS
  declare name: string
  declare description: string
  declare address: string
  declare phone: string
  declare email: string
  declare permission: keyof typeof PARTNER_PERMISSIONS
  declare password: string
  declare createdAt: Date
  declare updatedAt: Date

  static associate(models: { Member: typeof Member; Transaction: typeof Transaction }) {
    Partner.hasMany(models.Member, {
      foreignKey: 'partnerId',
      onDelete: 'CASCADE'
    })
    Partner.hasMany(models.Transaction, {
      foreignKey: 'partnerId',
      onDelete: 'CASCADE'
    })
  }
}

Partner.init(
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
    status: {
      type: DataTypes.ENUM(...Object.values(PARTNER_STATUS)),
      allowNull: false,
      defaultValue: PARTNER_STATUS.ACTIVE,
      values: Object.values(PARTNER_STATUS),
      validate: {
        is: nameRegex
      },
      field: 'status'
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: textRegex,
        len: [2, 500]
      },
      field: 'description'
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
      unique: true,
      validate: {
        isEmail: true
      },
      field: 'email'
    },
    permission: {
      type: DataTypes.ENUM(...Object.values(PARTNER_PERMISSIONS)),
      allowNull: false,
      defaultValue: PARTNER_PERMISSIONS.WRITE,
      values: Object.values(PARTNER_PERMISSIONS),
      validate: {
        is: nameRegex
      },
      field: 'permission'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /\$2[ayb]\$.{56}/gi
      },
      field: 'password'
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
    modelName: 'partner',
    tableName: 'partners',
    timestamps: true,
    sequelize
  }
)

const PartnerZod = z.object({
  id: zodIdSchema,
  name: z.string().regex(nameRegex).openapi({ example: 'Partner Name' }),
  description: z.string().regex(textRegex).openapi({ example: 'Partner Description' }),
  address: z.string().regex(addressRegex).openapi({ example: '123 Main St, Toronto, ON' }),
  phone: z.string().regex(phoneRegex).openapi({ example: '4161234567' }),
  email: z.string().email().openapi({ example: 'example@email.com' }),
  password: z.string().openapi({ example: '*********' }),
  status: z
    .enum([PARTNER_STATUS.ACTIVE, ...Object.values(PARTNER_STATUS).slice(1)])
    .default(PARTNER_STATUS.ACTIVE)
    .optional()
    .openapi({ example: PARTNER_STATUS.ACTIVE }),
  permission: z
    .enum([PARTNER_PERMISSIONS.WRITE, ...Object.values(PARTNER_PERMISSIONS).slice(1)])
    .default(PARTNER_PERMISSIONS.WRITE)
    .optional()
    .openapi({ example: PARTNER_PERMISSIONS.WRITE }),
  createdAt: zodDateSchema,
  updatedAt: zodDateSchema
})

export { Partner, PartnerZod, type PartnerAttributes, type PartnerCreationAttributes }