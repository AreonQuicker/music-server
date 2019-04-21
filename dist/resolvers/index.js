'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragmentReplacements = exports.resolvers = undefined;

var _prismaBinding = require('prisma-binding');

var _Query = require('./Query');

var _Query2 = _interopRequireDefault(_Query);

var _Mutation = require('./Mutation');

var _Mutation2 = _interopRequireDefault(_Mutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = {
  Query: _Query2.default,
  Mutation: _Mutation2.default
};

var fragmentReplacements = (0, _prismaBinding.extractFragmentReplacements)(resolvers);

exports.resolvers = resolvers;
exports.fragmentReplacements = fragmentReplacements;