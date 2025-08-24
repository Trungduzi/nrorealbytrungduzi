'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class byCard extends Model {
    static associate(models) {
      // define association here
    }
  }

  byCard.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      code: DataTypes.STRING,
      serial: DataTypes.STRING,
      userid: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'byCard',
      tableName: 'byCard',
      freezeTableName: true,
    }
  );

  return byCard;
};


