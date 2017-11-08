'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Users', ['username'], {
      type: 'unique',
      name: 'custom_unique_constraint_username_on_Users'
    });
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
