'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('user', {
      userID: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userName: { type: STRING(128), allowNull: false },
      password: { type: STRING(64), allowNull: false },
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  async down(queryInterface ) {
    await queryInterface.dropTable('user');
  },
};
