"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pacientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      /* Pacientes y Usuarios (1:N) */
      Pacientes.belongsTo(models.Usuario, {
        as: "usuarios",
        foreignKey: "id_usuario", // foreignKey de Usuario
      });

      Pacientes.belongsTo(models.Cita, {
        as: "cita",
        foreignKey: "id_paciente", // foreingKey en Paciente
      });
    }
  }
  Pacientes.init(
    {
      id_usuario: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pacientes",
      tableName: "pacientes",
    }
  );
  return Pacientes;
};
