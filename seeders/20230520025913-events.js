'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('events',[{
      name: 'Acoustic Energy',
      date: '2023-05-01',
      start_time: '2023-05-01T12:00:00',
      end_time: '2023-05-01T14:00:00'
    },{
      name: 'MEGAFEST',
      date: '2023-05-02',
      start_time: '2023-05-02T11:00:00',
      end_time: '2023-05-02T13:00:00'
    },{
      name: 'Souls of the Century',
      date: '2023-05-03',
      start_time: '2023-05-03T10:00:00',
      end_time: '2023-05-03T12:00:00'
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {});
  }
};
