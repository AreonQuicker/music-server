const Mutation = {  
  async createSong(parent, args, { prisma }, info) {
        const song = await prisma.mutation.createSong({
          data : {
            ...args
          }
        },info);
        return song
    },
}

export { Mutation as default }