const { Sequelize, Model } = require('sequelize');

const UserModel = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo);
    }
  }

  User.init({
    fullName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

module.exports = UserModel;