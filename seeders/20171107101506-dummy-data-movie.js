'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', [{
      title: 'Harry Potter and The Goblet of Fire',
      genre: 'Adventure',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
      duration: 120,
      ticket_price: 50000,
      ScheduleId: 1,
    },{
      title: 'The Lord of The Rings - The Two Tower',
      genre: 'Adventure',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
      duration: 160,
      ticket_price: 50000,
      ScheduleId: 1
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
