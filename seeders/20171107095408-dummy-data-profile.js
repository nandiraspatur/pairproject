'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Profiles', [{
      first_name: 'Nandira',
      last_name: 'Paturohman',
      email: 'nsp@mail.com',
      phone_number: '087820837182',
      UserId: 1
    },{
      first_name: 'Zuhri',
      last_name: 'Nurhuda',
      email: 'zhr@mail.com',
      phone_number: '087820837182',
      UserId: 2
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
