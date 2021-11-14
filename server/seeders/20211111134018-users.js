"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        email: "1234@1234.com",
        password:
          "TvgkO5222WoyqeoNLIXbJ6HS4RGTQpai4PkE6O7R6jab9wg2YI6koKwq3j0ELODe5roWQ4msh2U7FXB6B6JtZQ==",
        salt: "1a8bNvpxFoHL3Nr20OrRyA==",
        address: "서울시 강남구 역삼동 830-9",
        intro: "반가워요~ 같은 동네에서 만나면 인사해요.",
        img: "",
        nickname: "김코딩",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: "abcd@abcd.com",
        password:
          "unxT/hL9KSMMqXp/hzpBZoFdfm70hmxKHo+uDU9hqKWjR7oeZB9DHijn1MGzrENqq0OeAJ5sgw3sxa5mJe543g==",
        salt: "6XsjBwRd+Gm5JsZ8ztBPyw==",
        address: "서울시 서초구 서초동 1337-2 아크로텔 206호",
        intro: "취미는 축구입니다. 같이 운동하면 좋을꺼 같아요~",
        img: "",
        nickname: "박해커",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        email: "check@check.com",
        password:
          "TXxpwx2lpBu2cq1wYVA9B+Twk6xG8iM3MAc2JwwxJKJnyqV1+/fOOMFjaP9pwjhhG2w0zhbXY3i6qyj36NzL6g==",
        salt: "9QmHqpL4HyE2QfELdWfk8Q==",
        address: "서울시 강남구 역삼동 823-10 신도빌딩 1F",
        intro: "요리하는거 좋아하는데 같이 요리 레시피 공유해요.",
        img: "",
        nickname: "최맛집",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
