const { forwardTo } = require('prisma-binding');

const Query = {
    users: forwardTo('db')
}

export { Query as default }