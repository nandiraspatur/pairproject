'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
     'Movies',
      'trailer_link',
      Sequelize.STRING)
    queryInterface.addColumn(
     'Movies',
      'picture_name',
      Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
