'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Limit extends Model {
    static associate(models) {
      Limit.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Limit.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Limit.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      limit_amount: {
        type: DataTypes.DECIMAL(13, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      recurrence: {
        type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Limit',
      tableName: 'Limits',
    },
  );
  return Limit;
};
