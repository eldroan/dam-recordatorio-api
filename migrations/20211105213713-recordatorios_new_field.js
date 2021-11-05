"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "recordatorios", // table name
        "legajo", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("recordatorios", "legajo"),
    ]);
  },
};
