"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init(
    {
      contents: DataTypes.STRING,
      category: DataTypes.STRING,
      views: { defaultValue: 0, type: DataTypes.INTEGER },
      img: { defaultValue: "", type: DataTypes.STRING },
      location: { defaultValue: "", type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
