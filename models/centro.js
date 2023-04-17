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
      // define association here

      Centro.belongsTo(models.Citas, {
        foreignKey: "id_centro", // foreignKey en modelo Cita
      });
    }
  }
  centro.init(
    {
      nombre_lugar: DataTypes.STRING,
      direccion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Centro",
      tableName: "centro",
    }
  );
  return Centro;
};
