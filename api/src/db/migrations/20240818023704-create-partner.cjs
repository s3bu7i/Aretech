'use strict'

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize & import('sequelize').DataTypes} Sequelize
   * @returns {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('partners', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          isInt: true
        },
        field: 'id'
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'TERMINATED', 'UNAVAILABLE'),
        allowNull: false,
        defaultValue: 'ACTIVE',
        values: ['ACTIVE', 'TERMINATED', 'UNAVAILABLE'],
        validate: {
          is: /^[\w\s]+$/gi
        },
        field: 'status'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s]+$/gi,
          len: [2, 50]
        },
        field: 'name'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          is: /^[\w\s.,!?'"()-]+$/gi,
          len: [2, 500]
        },
        field: 'description'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s.,-]+$/gi,
          len: [2, 255]
        },
        field: 'address'
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[\w\s.()-]+$/gi,
          len: [2, 25]
        },
        field: 'phone'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        },
        field: 'email'
      },
      permission: {
        type: Sequelize.ENUM('READ', 'WRITE', 'BALANCE_INQUIRY'),
        allowNull: false,
        defaultValue: 'READ',
        values: ['READ', 'WRITE', 'BALANCE_INQUIRY'],
        validate: {
          is: /^[\w\s]+$/gi
        },
        field: 'permission'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /\$2[ayb]\$.{56}/gi
        },
        field: 'password'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        },
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true
        },
        field: 'updated_at'
      }
    })
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @returns {Promise<void>}
   */
  down: async (queryInterface) => {
    await queryInterface.dropTable('partners')
  }
}
