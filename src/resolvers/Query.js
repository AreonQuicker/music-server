const { forwardTo } = require('prisma-binding');

const Query = {
    songs: forwardTo('prisma'),
    songs2(parent, args, { prisma }, info) {
        throw new Error('You must be logged in!');
        return prisma.query.songs(args, info)
    },
}

export { Query as default }