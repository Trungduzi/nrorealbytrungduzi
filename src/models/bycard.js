'use strict';
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class byCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  byCard.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    code: DataTypes.STRING,
    serial: DataTypes.STRING,
    userid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'byCard',
  });
  return byCard;
};


