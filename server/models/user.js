"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      img: { defaultValue: "https://dongne-moon-s3.s3.ap-northeast-2.amazonaws.com/uploads/1637135832845_%20mypage.png", type: DataTypes.STRING },
      address: DataTypes.STRING,
      intro: { defaultValue: "", type: DataTypes.STRING },
      nickname: { defaultValue: "User", type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
