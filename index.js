const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const dotenv = require('dotenv');

const redisHelper= require('./helpers/redis-helper');
const dbHelper = require('./helpers/db-helper');
const authHelper = require('./helpers/auth-helper');

const typeDefs = require('./typedefs/typedefs');
const resolvers = require('./resolvers/resolvers');

dotenv.config({ path: process.env.ENV_PATH });

const startServer = async () => {
  redisHelper.createRedisCient();
  await dbHelper.connect();
  const models = dbHelper.registerModels();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 80 },
    context: async ({ req }) => {
      const user = await authHelper.isUserLoggedIn(req);

      return { models, user };
    }
  });

  console.log(`Server started at: ${url}`);
};

startServer();