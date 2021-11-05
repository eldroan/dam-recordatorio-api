"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recordatorios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recordatorios.init(
    {
      mensaje: DataTypes.STRING,
      fecha: DataTypes.DATE,
      legajo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "recordatorios",
    }
  );
  return recordatorios;
};
