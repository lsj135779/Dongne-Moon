'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        email: '1234@1234.com',
        password: '1234',
        salt: 'abcd',
        address: '서울시 강남구 역삼동 830-9',
        intro: '반가워요~ 같은 동네에서 만나면 인사해요.',
        img: "1",
        nickname: '김코딩',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'abcd@abcd.com',
        password: 'abcd',
        salt: 'efg',
        address: '서울시 서초구 서초동 1337-2 아크로텔 206호',
        intro: '취미는 축구입니다. 같이 운동하면 좋을꺼 같아요~',
        img: "2",
        nickname: '박해커',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'qwer@qwer.com',
        password: 'qwer',
        salt: 'zxcv',
        address: '서울시 강남구 역삼동 823-10 신도빌딩 1F',
        intro: '요리하는거 좋아하는데 같이 요리 레시피 공유해요.',
        img: "3",
        nickname: '최맛집',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
