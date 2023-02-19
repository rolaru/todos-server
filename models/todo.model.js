const { Sequelize, Model } = require('sequelize');

const TodoModel = (sequelize) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User);
    }
  }

  Todo.init({
    content: Sequelize.STRING,
    isDone: Sequelize.BOOLEAN,
    userId: Sequelize.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};

module.exports = TodoModel;