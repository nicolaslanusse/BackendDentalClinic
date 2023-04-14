"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      /* Usuarios y Roles (1:N) */
      Usuarios.belongsTo(models.Roles, {
        as: "roles",
        foreignKey: "id_roles", // foreignKey de Usuario
      });

      Usuarios.hasMany(models.Doctores, {
        foreignKey: "id_usuario", // foreignKey de Usuario
      });
    }
  }
  Usuarios.init(
    {
      nombre: {
        type: DataTypes.STRING,
        validate: {
          is: /^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$/,
        },
      },
      apellidos: {
        type: DataTypes.STRING,
        validate: {
          is: /^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$/,
        },
      },
      edad: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "Debe ser un número entero",
          },
          min: {
            msg: "La edad debe ser mayor que 1",
            args: 1,
          },
          max: 100,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true, isLowercase: true },
      },
      telefono: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          isInt: {
            msg: "El número telefónico tiene que ser entero",
          },
          len: [9],
        },
      },
      password: { type: DataTypes.STRING },
      id_roles: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "Usuarios",
      tableName: "usuarios",
    }
  );
  return Usuarios;
};
