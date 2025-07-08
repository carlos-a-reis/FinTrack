'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Transaction.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Transaction.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(13, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      recurrence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'Transactions',
    },
  );
  return Transaction;
};
