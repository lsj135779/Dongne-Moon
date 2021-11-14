"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("posts", [
      {
        id: 1,
        userId: 1,
        category: "맛집",
        views: 0,
        contents: "여기 맛집입니다.",
        img: "",
        location: "",
        comment_cnt: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        category: "맛집",
        views: 0,
        contents: "짬밥이 더맛있어요",
        img: "",
        location: "",
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 1,
        category: "맛집",
        views: 0,
        contents: "비비고 만두가짱",
        img: "",
        location: "",
        comment_cnt: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("posts", null, {});
  },
};
