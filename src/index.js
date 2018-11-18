const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const gql = require('graphql-tag');
const glob = require('glob');
const path = require('path');
require('dotenv').config();
const APIKEY = process.env.API_KEY;

const MoviesService = require('./service/api');
const resolvers = require('./resolvers');

const basePath = path.join(__dirname, './models/');
const schemasPath = glob.sync(`${basePath}**/*.graphql`);

const Query = gql`
  type Query {
    _empty: String
  }
`;

const typeDefs = [
  Query,
  ...schemasPath
    .map(schema => gql(fs.readFileSync(schema, 'utf8'))),
];

const context = { apiKey: APIKEY };
const options = { port: process.env.PORT || 4040 };
const graphQLOptions = ({
  context,
  typeDefs,
  resolvers,
  dataSources: () => ({
    moviesService: new MoviesService(),
  }),
  introspection: true
});
const server = new ApolloServer(graphQLOptions);

server.listen(options).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
