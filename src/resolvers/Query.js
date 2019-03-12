const { forwardTo } = require('prisma-binding');

const Query = {
    songs: forwardTo('prisma'),
    songs2(parent, args, { prisma }, info) {
        console.log('Fetch');      
        return prisma.query.songs(args, info)
    },
}

export { Query as default }