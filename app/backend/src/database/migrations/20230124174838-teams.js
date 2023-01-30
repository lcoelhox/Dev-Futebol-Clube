"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },{
      timestamps: false,
      underscored: true,
    } );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('teams');
 }
};
