'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', [{
      postId: 1,
      userId: 2,
      contents: "반갑습니다.",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      postId: 1,
      userId: 2,
      contents: "저도 함께하고 싶어요",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      postId: 1,
      userId: 2,
      contents: "즐거운 하루 되세요",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  }
};
