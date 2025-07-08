'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      amount: {
        type: Sequelize.DECIMAL(13, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      type: {
        type: Sequelize.ENUM('income', 'expense'),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      recurrence: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Transactions');
  },
};
