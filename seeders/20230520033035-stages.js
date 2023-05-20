'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stages', [{
        stage_name: 'Kings Castle'
    },{
        stage_name: 'Barclays Center'
    },{
        stage_name: 'The Brooklyn Mirage'
    }
  ])

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stages',null,{});
  }
};
