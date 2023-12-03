'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('user', 'userLevel', {
      type: Sequelize.INTEGER,
      allowNull: false, // 不能為空
      defaultValue: 0, // 默認值
    });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn('user', 'userLevel');
  },
};
