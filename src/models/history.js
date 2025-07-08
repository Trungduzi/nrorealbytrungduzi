"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class history extends Model {
    static associate(models) {
      // define association here
    }
  }

  history.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      code: DataTypes.STRING,
      serial: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.STRING,
      receive: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "history",
    }
  );

  return history;
};
