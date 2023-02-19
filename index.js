const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const dotenv = require('dotenv');

const dbHelper = require('./helpers/db-helper.js');

const typeDefs = require('./typedefs/typedefs.js');
const resolvers = require('./resolvers/resolvers.js');

dotenv.config({ path: process.env.ENV_PATH });

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startServer = async () => {
  await dbHelper.connect();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 80 }
  });

  console.log(`Server started at: ${url}`);
};

startServer();