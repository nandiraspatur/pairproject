'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Schedules', [{
      time: '13:00',
      studio: 'Studio 1'
    },{
      time: '16:00',
      studio: 'Studio 2'
    },{
      time: '18:30',
      studio: 'Studio 1'
    },{
      time: '20:15',
      studio: 'Studio 2'
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
