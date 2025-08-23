"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class creatUser extends Model {
    static associate(models) {
      // define association here if needed
    }
  }

  creatUser.init(
    {
      firstName: DataTypes.STRING,
      user: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      dollar: DataTypes.DECIMAL,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "creatUser",
    }
  );

  return creatUser;
};
