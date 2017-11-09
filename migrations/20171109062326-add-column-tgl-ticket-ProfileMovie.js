'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
     'ProfileMovies',
      'buy_date',
      Sequelize.STRING)
    queryInterface.addColumn(
     'ProfileMovies',
      'ticket_code',
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
