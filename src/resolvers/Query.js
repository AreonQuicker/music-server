const { forwardTo } = require('prisma-binding');

const Query = {
    songs: forwardTo('prisma')
}

export { Query as default }