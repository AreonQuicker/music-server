'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = require('prisma-binding'),
    forwardTo = _require.forwardTo;

var Query = {
  songs: forwardTo('prisma'),
  users: forwardTo('prisma'),
  songs2: function songs2(parent, args, _ref, info) {
    var prisma = _ref.prisma;

    return prisma.query.songs(args, info);
  }
};

exports.default = Query;