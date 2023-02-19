const authResolvers = require('./auth-resolvers');
const todoResolvers = require('./todo-resolvers');

const resolvers = {
  Query: {
    ...todoResolvers.queries
  },

  Mutation: {
    ...authResolvers.mutations,
    ...todoResolvers.mutations
  }
};

module.exports = resolvers;