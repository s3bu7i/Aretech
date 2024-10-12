'use strict'

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize & import('sequelize').DataTypes} Sequelize
   * @returns {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('members', {
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
      partnerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'partners',
          key: 'id'
        },
        onDelete: 'CASCADE',
        validate: {
          isInt: true
        },
        field: 'partner_id'
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
        validate: {
          isEmail: true
        },
        field: 'email'
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: true
        },
        field: 'balance'
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'ACTIVE', 'DEACTIVATED'),
        allowNull: false,
        defaultValue: 'PENDING',
        values: ['PENDING', 'ACTIVE', 'DEACTIVATED'],
        validate: {
          is: /^[\w\s]+$/gi
        },
        field: 'status'
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

    await queryInterface.addConstraint('members', {
      fields: ['partner_id', 'email'],
      type: 'unique',
      name: 'members_partner_id_email_unique'
    })
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @returns {Promise<void>}
   */
  down: async (queryInterface) => {
    await queryInterface.removeConstraint('members', 'members_partner_id_email_unique')
    await queryInterface.dropTable('members')
  }
}
