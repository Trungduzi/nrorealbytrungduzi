"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class createCard extends Model {
    static associate(models) {
      // define association here
    }
  }

  createCard.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      code: DataTypes.STRING,
      serial: DataTypes.STRING,
      status: DataTypes.STRING,
      username: DataTypes.STRING,
      dollar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "createCard",
      freezeTableName: true
    }
  );

  return createCard;
};
