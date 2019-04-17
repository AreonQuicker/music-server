const { forwardTo } = require('prisma-binding');

const Query = {
  songs: forwardTo('prisma'),
  users: forwardTo('prisma'),
  songs2(parent, args, { prisma }, info) {
    return prisma.query.songs(args, info);
  },
};

export { Query as default };
