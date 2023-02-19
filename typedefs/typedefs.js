const typeDefs = `#graphql
  type User {
    id: ID
    fullName: String!
    email: String!
    password: String
  }

  type Todo {
    id: ID
    content: String!
    isDone: Boolean
    userId: ID!
  }

  type Query {
    getAllTodosForUser(userId: ID!): [Todo!]!
  }

  type Mutation {
    login(email: String!, password: String!): User!
    register(email: String!, password: String!, fullName: String!): User!
  
    createTodo(userId: ID!, content: String!): Todo!
    updateTodo(id: ID!, isDone: Boolean!): Boolean!
    deleteTodo(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;