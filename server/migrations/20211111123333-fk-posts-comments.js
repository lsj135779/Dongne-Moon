'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('comments', 'postId', Sequelize.INTEGER)

    await queryInterface.addConstraint('comments', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'fk-posts-comments',
      references: {
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('comments', 'fk-posts-comments')

    await queryInterface.removeColumn('comments', 'postId')
  }
};
