'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'userId', Sequelize.INTEGER)

    await queryInterface.addConstraint('posts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk-users-posts',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('posts', 'fk-users-posts')

    await queryInterface.removeColumn('posts', 'userId')
  }
};
