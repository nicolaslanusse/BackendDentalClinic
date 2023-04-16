"use strict";

const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          nombre: "Luis",
          apellidos: "Suarez",
          edad: 19,
          email: "bolso@gmail.com",
          telefono: 616540798,
          password: bcrypt.hashSync("bolso", 10),
          id_rol: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Francisco",
          apellidos: "Diaz",
          edad: 29,
          email: "pancho@gmail.com",
          telefono: 632989051,
          password: bcrypt.hashSync("admin", 10),
          id_rol: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Alberto",
          apellidos: "Mendez",
          edad: 45,
          email: "alberto@gmail.com",
          telefono: 632872539,
          password: bcrypt.hashSync("alberto", 10),
          id_rol: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", {
      [Op.or]: [
        {
          nombre: "Luis",
        },
        {
          nombre: "Francisco",
        },
        {
          nombre: "Alberto",
        },
      ],
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
