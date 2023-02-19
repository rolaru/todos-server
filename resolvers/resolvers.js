const { v4: uuidv4 } = require('uuid');

const dummyUsers = [
  {
    id: '940c75ce-d0f7-4614-b713-30e6dacebeaf',
    fullName: 'Olaru Razvan',
    email: 'olarurazvan_2000@yahoo.com',
    password: 'Test1234'
  }
];

const dummyTodos = [
  {
    id: '574eac10-4eaf-4352-8890-002720b78782',
    content: 'Read at least 30 mintes',
    isDone: false,
    userId: '940c75ce-d0f7-4614-b713-30e6dacebeaf'
  },
  {
    id: '595f4e3a-e315-44cc-a9c6-28dac5b9536a',
    content: 'Cold shower',
    isDone: true,
    userId: '940c75ce-d0f7-4614-b713-30e6dacebeaf'
  },
  {
    id: 'd4450a13-30ef-4b93-8453-744434c6a1c2',
    content: 'Meditate',
    isDone: false,
    userId: '940c75ce-d0f7-4614-b713-30e6dacebeaf'
  },
  {
    id: 'ffd93104-0a0c-49f7-ac2e-579de680e5d9',
    content: 'Get to sleep early',
    isDone: false,
    userId: '940c75ce-d0f7-4614-b713-30e6dacebeaf'
  },
];

const resolvers = {
  Query: {
    async getAllTodosForUser(root, { userId }) {
      return dummyTodos;
    }
  },

  Mutation: {
    async login(root, { email, password }) {
      return dummyUsers[0];
    },

    async register(root, { email, password, fullName }) {
      return dummyUsers[0];
    },

    async createTodo(root, { content }) {
      return {
        id: uuidv4(),
        content,
        isDone: false
      };
    },

    async updateTodo(root, { isDone }) {
      return {
        ...dummyTodos[0],
        isDone
      };
    },

    async deleteTodo(root, { id }) {
      return true;
    }
  }
};

module.exports = resolvers;