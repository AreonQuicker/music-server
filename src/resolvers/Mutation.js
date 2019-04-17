const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
  async createSong(parent, args, { prisma, request }, info) {
    const { userId } = request.request;
    if (!userId) {
      throw new Error('You must be signed in soooon');
    }
    const song = await prisma.mutation.createSong(
      {
        data: {
          ...args,
          uploadedAuthor: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
    return song;
  },

  async signUp(parent, args, { prisma, request }, info) {
    const password = await bcrypt.hash(args.password, 10);

    console.log(password);

    const createdUser = await prisma.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      `{
          id
        }`
    );

    const user = (await prisma.query.users(
      {
        where: {
          id: createdUser.id,
        },
      },
      info
    ))[0];

    console.log(user);

    const token = jwt.sign({ userId: createdUser.id }, process.env.APP_SECRET);

    return {
      ...user,
      token,
    };
  },

  // async signin(parent, { email, password }, ctx, info) {
  //   const user = await ctx.db.query.user({ where: { email } });
  //   if (!user) {
  //     throw new Error(`No such user found for email ${email}`);
  //   }

  //   const valid = await bcrypt.compare(password, user.password);
  //   if (!valid) {
  //     throw new Error('Invalid Password!');
  //   }

  //   const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  //   return user;
  // },
};

export { Mutation as default };
