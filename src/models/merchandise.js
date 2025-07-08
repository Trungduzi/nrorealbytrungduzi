"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class merchandise extends Model {
    static associate(models) {
      // define association here
    }
  }

  merchandise.init(
    {
      image: DataTypes.STRING,
      usergame: DataTypes.STRING,
      password: DataTypes.STRING,
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "merchandise",
    }
  );

  return merchandise;
};
