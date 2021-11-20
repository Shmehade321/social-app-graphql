const { ApolloServer } = require("apollo-server");
const {PubSub} = require('graphql-subscriptions')
const connectDB = require('./config/db')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req, pubsub})
});

connectDB()

const PORT = 5000
server
  .listen({port: PORT})
  .then((response) => console.log(`Server running at ${response.url}`));
