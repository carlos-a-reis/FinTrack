'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Limit, {
        foreignKey: 'category_id',
        as: 'limits',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      Category.hasMany(models.Transaction, {
        foreignKey: 'category_id',
        as: 'transactions',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      Category.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories',
    },
  );
  return Category;
};
