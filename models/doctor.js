"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      /* Doctores y Usuarios (1:N) */
      Doctores.belongsTo(models.Usuarios, {
        as: "Doctor",
        foreignKey: "id_usuario", // foreignKey de Usuario
      });

      Doctores.belongsToMany(models.Pacientes, {
        through: "citas",
        foreignKey: "id_doctor", // foreingKey en Doctor
      });
    }
  }
  Doctores.init(
    {
      id_usuario: DataTypes.INTEGER,
      activo: DataTypes.ENUM("si", "no"),
    },
    {
      sequelize,
      modelName: "Doctores",
      tableName: "doctores",
    }
  );
  return Doctores;
};
