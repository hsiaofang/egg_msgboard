'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('message', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userID: INTEGER,
      title: STRING(64),
      content: TEXT,
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  async down(queryInterface, Sequelize) {

  },
};
