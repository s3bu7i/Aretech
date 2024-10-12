import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'
import { sequelize } from '@/db/index.ts'
import { zodDateSchema, zodIdSchema } from '@/utils/index.ts'
import { TRANSACTION_STATUS, TRANSACTION_TYPE, nameRegex, textRegex } from '@/constants/index.ts'
import { Member, Partner, Rewards } from '@/db/models/index.ts'

extendZodWithOpenApi(z)

interface TransactionAttributes {
  id: number
  category: string
  description: string
  points: number
  partnerId: number
  rewardId: number
  transactedAt: Date
  createdAt: Date
  updatedAt: Date
  //other fields from original api
  reference: string
  memberId: number
  partnerRefId?: string
  status: keyof typeof TRANSACTION_STATUS
  type: keyof typeof TRANSACTION_TYPE
  amount: number
  note?: string
}

type TransactionCreationAttributes = Optional<
  TransactionAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'description'
>

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
  declare id: number;
  declare category: string;
  declare description: string;
  declare points: number;
  declare partnerId: number;
  declare rewardId: number;
  declare transactedAt: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
  //others
  declare reference: string
  declare memberId: number
  declare partnerRefId?: string
  declare status: keyof typeof TRANSACTION_STATUS
  declare type: keyof typeof TRANSACTION_TYPE
  declare amount: number
  declare note?: string

  // associations if needed
  // static associate(models: { Partner: typeof Partner }) {
  //   Transaction.belongsTo(models.Partner, {
  //     foreignKey: 'partnerId',
  //     onDelete: 'CASCADE'
  //   });
  // }

  static associate(models: { Partner: typeof Partner; Member: typeof Member; Rewards: typeof Rewards }) {
    Transaction.belongsTo(models.Partner, {
      foreignKey: 'partnerId',
      onDelete: 'CASCADE'
    })
    Transaction.belongsTo(models.Member, {
      foreignKey: 'memberId',
      onDelete: 'CASCADE'
    })
    Transaction.belongsTo(models.Rewards, {
      foreignKey: 'rewardId',
      onDelete: 'CASCADE'
    })
  }
}

Transaction.init(
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      },
      field: 'category'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [2, 500]
      },
      field: 'description'
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      },
      field: 'points'
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      },
      field: 'partner_id'
    },
    rewardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      },
      field: 'reward_id'
    },
    transactedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'transacted_at'
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
    },
    reference: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      },
      field: 'reference'
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Member,
        key: 'id'
      },
      onDelete: 'CASCADE',
      validate: {
        isInt: true
      },
      field: 'member_id'
    },
    partnerRefId: {
      type: DataTypes.TEXT,
      validate: {
        is: textRegex,
        len: [2, 500]
      },
      field: 'partner_ref_id'
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TRANSACTION_STATUS)),
      allowNull: false,
      defaultValue: TRANSACTION_STATUS.PENDING,
      values: Object.values(TRANSACTION_STATUS),
      validate: {
        is: nameRegex
      },
      field: 'status'
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TRANSACTION_TYPE)),
      allowNull: false,
      defaultValue: TRANSACTION_TYPE.PAYMENT,
      values: Object.values(TRANSACTION_TYPE),
      validate: {
        is: nameRegex
      },
      field: 'type'
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      },
      field: 'amount'
    },
    note: {
      type: DataTypes.TEXT,
      validate: {
        is: textRegex,
        len: [2, 500]
      },
      field: 'note'
    },
  },
  {
    modelName: 'transaction',
    tableName: 'transactions',
    timestamps: true,
    sequelize
  }
);

Partner.associate({ Member, Transaction })
Member.associate({ Partner, Transaction })
// Rewards.associate({ Transaction });
// Transaction.associate({ Partner, Member, Rewards })
// Rewards.associate({ Transaction })

const TransactionZod = z.object({
  id: z.number().int().positive().openapi({ example: 1 }),
  category: z.string().min(2).max(50).openapi({ example: 'Purchase' }),
  description: z.string().min(2).max(500).openapi({ example: 'Description of the transaction' }),
  points: z.number().int().nonnegative().openapi({ example: 100 }),
  partnerId: z.number().int().positive().openapi({ example: 1 }),
  rewardId: z.number().int().positive().openapi({ example: 1 }),
  transactedAt: zodDateSchema.openapi({ example: '2024-09-14T12:00:00Z' }),
  createdAt: zodDateSchema.openapi({ example: '2024-09-14T12:00:00Z' }),
  updatedAt: zodDateSchema.openapi({ example: '2024-09-14T12:00:00Z' }),
  memberId: zodIdSchema.openapi({ example: 1 }),
  partnerRefId: z.string().regex(textRegex).optional().openapi({ example: 'INV-20234' }),
  reference: z.string().uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174001' }),
  amount: z.number().int().nonnegative().openapi({ example: 100 }),
  note: z.string().regex(textRegex).optional().openapi({ example: 'This is a note about the transaction.' }),
  status: z
    .enum([TRANSACTION_STATUS.PENDING, ...Object.values(TRANSACTION_STATUS).slice(1)])
    .default(TRANSACTION_STATUS.PENDING)
    .optional()
    .openapi({ example: TRANSACTION_STATUS.PENDING }),
  type: z
    .enum([TRANSACTION_TYPE.PAYMENT, ...Object.values(TRANSACTION_TYPE).slice(1)])
    .default(TRANSACTION_TYPE.PAYMENT)
    .optional()
    .openapi({ example: TRANSACTION_TYPE.PAYMENT })
});

export { Transaction, TransactionZod, type TransactionAttributes, type TransactionCreationAttributes };