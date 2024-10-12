import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { DataTypes, Model, Optional } from 'sequelize'
import { z } from 'zod'

// import { MEMBER_STATUS, addressRegex, nameRegex, phoneRegex } from '@/constants/index.ts'
import { sequelize } from '@/db/index.ts'
// import { Member } from '@/db/models/index.ts'
import { zodIdSchema } from '@/utils/index.ts'

extendZodWithOpenApi(z)

export enum AnimalType {
    Turtle,
    Squirrel,
    Bird,
    Wolf,
    Eagle,
}

interface UserAttributes {
  id: number
  // memberId: number
  email: string
  balance: number
  password: string
  animal: string
  createdAt: Date
  updatedAt: Date
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'email' | 'password' | 'createdAt' | 'updatedAt'>

class User extends Model<UserAttributes, UserCreationAttributes> {
    declare id: number
    // declare memberId: number
    declare email: string
    declare balance: number
    declare password: string
    declare animal: string
    declare createdAt: Date
    declare updatedAt: Date

    // static associate(models: { Member: typeof Member }) {
    //     User.hasOne(models.Member, {
    //         foreignKey: 'memberId',
    //         onDelete: 'CASCADE'
    //     })
    // }
}

User.init(
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
      // memberId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Members',
      //     key: 'id'
      //   },
      //   onDelete: 'CASCADE',
      //   validate: {
      //     isInt: true
      //   },
      //   field: 'member_id'
      // },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        field: 'email'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      animal: {
        type: DataTypes.ENUM(...Object.keys(AnimalType)),
        allowNull: false,
        validate: {
          isIn: [Object.keys(AnimalType)]
        },
        field: 'animal'
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'balance'
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
      modelName: 'user',
      tableName: 'users',
      timestamps: true,
      sequelize
    }
);

const UserZod = z.object({
    id: zodIdSchema,
    // memberId: zodIdSchema,
    email: z.string().email().openapi({ example: 'user@example.com' }),
    password: z.string().min(8).openapi({ example: 'password123' }),
    animal: z.enum(["Turtle", "Squirrel", "Bird", "Wolf", "Eagle"])
      .openapi({ example: "Turtle" }),
});

export { User, UserZod, type UserAttributes, type UserCreationAttributes }
