const todoResolvers = {};

todoResolvers.queries = {
  async getAllTodosForUser(root, { userId }, { models }) {
    const allTodos = await models.Todo.findAll({
      where: { userId }
    });

    return allTodos;
  }
};

todoResolvers.mutations = {
  async createTodo(root, { userId, content }, { models }) {
    const todo = await models.Todo.create({
      content,
      isDone: false,
      userId
    });

    return todo;
  },

  async updateTodo(root, { id, isDone }, { models }) {
    await models.Todo.update({ isDone }, { where: { id } });

    return isDone;
  },

  async deleteTodo(root, { id }, { models }) {
    await models.Todo.destroy({ where: { id } });

    return true;
  }
};

module.exports = todoResolvers;