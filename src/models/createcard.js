'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class createCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  createCard.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    code: DataTypes.STRING,
    serial: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'createCard',
    tableName: 'createCard'
  });
  return createCard;
};