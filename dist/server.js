'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _graphqlYoga = require('graphql-yoga');

var _index = require('./resolvers/index');

var _prisma = require('./prisma');

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pubsub = new _graphqlYoga.PubSub();

var server = new _graphqlYoga.GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: _index.resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: function context(request) {
    return {
      pubsub: pubsub,
      prisma: _prisma2.default,
      request: request
    };
  },

  fragmentReplacements: _index.fragmentReplacements
});

exports.default = server;