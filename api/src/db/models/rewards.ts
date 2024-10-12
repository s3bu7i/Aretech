import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'
import { sequelize } from '@/db/index.ts'
import { zodDateSchema } from '@/utils/index.ts'
import { Transaction } from '@/db/models/index.ts'

extendZodWithOpenApi(z)

interface RewardsAttributes {
  id: number;
  name: string;
  points: number;
  image: string;
  description: string;
  company: string;
  category: string;
  // partnerId: number;
  createdAt: Date;
  updatedAt: Date;
}

type RewardsCreationAttributes = Optional<RewardsAttributes, 'id' | 'image' | 'description' | 'createdAt' | 'updatedAt'>

class Rewards extends Model<RewardsAttributes, RewardsCreationAttributes> {
  declare id: number;
  declare name: string;
  declare points: number;
  declare image: string;
  declare description: string;
  declare company: string;
  declare category: string;
  // declare partnerId: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: { Transaction: typeof Transaction }) {
    Rewards.hasMany(models.Transaction, {
      foreignKey: 'partnerId',
      onDelete: 'CASCADE'
    })
  }
}

Rewards.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      },
      field: 'name'
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      },
      field: 'points'
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255]
      },
      field: 'image'
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 500]
      },
      field: 'description'
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'company'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'category'
    },
    // partnerId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   field: 'partnerId'
    // },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true
      },
      field: 'updatedAt'
    }
  },
  {
    modelName: 'rewards',
    tableName: 'Rewards',
    timestamps: true,
    sequelize
  }
);

const RewardsZod = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2).max(50).openapi({ example: 'Reward Name' }),
  points: z.number().int().nonnegative().openapi({ example: 100 }),
  image: z.string().optional().openapi({ example: 'http://example.com/image.jpg' }),
  description: z.string().max(500).optional().openapi({ example: 'Detailed description of the reward' }),
  company: z.string().openapi({ example: "Patagonia" }),
  category: z.string().openapi({ example: "Gift Card" }),
  partnerId: z.number().openapi({ example: 1 }),
  createdAt: zodDateSchema,
  updatedAt: zodDateSchema
});

export { Rewards, RewardsZod, type RewardsAttributes, type RewardsCreationAttributes };
