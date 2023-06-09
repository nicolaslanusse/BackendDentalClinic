"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Centro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Centro.hasMany(models.Citas, {
        foreignKey: "id_centro", // foreignKey en modelo Cita
      });
    }
  }
  Centro.init(
    {
      nombre_lugar: DataTypes.STRING,
      direccion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Centro",
      tableName: "centros",
    }
  );
  return Centro;
};
