const { Model } = require('sequelize');

const TodoModel = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User);
    }
  }

  Todo.init({
    content: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};

module.exports = TodoModel;