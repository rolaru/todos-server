const { Sequelize, Model } = require('sequelize');

const TodoModel = (sequelize) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User);
    }
  }

  Todo.init({
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isDone: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};

module.exports = TodoModel;