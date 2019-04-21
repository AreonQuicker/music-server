import { validateEmail, validatePassword } from '../utils/utils';

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
    if (!validateEmail(args.email)) {
      throw new Error('Invalid email.');
    }

    if (!validatePassword(args.password)) {
      throw new Error('Invalid password.');
    }

    const password = await bcrypt.hash(args.password, 10);

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

    const user = await prisma.query.user(
      {
        where: {
          id: createdUser.id,
        },
      },
      info
    );

    const token = jwt.sign({ userId: createdUser.id }, process.env.APP_SECRET);

    return {
      ...user,
      token,
    };
  },

  async signIn(parent, { email, password }, { prisma, request }, info) {
    const validateUser = await prisma.query.user({ where: { email } });
    if (!validateUser) {
      throw new Error(`No such user found for email ${email}`);
    }

    const valid = await bcrypt.compare(password, validateUser.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }

    const user = await prisma.query.user(
      {
        where: {
          id: validateUser.id,
        },
      },
      info
    );

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      ...user,
      token,
    };
  },
};

export { Mutation as default };
