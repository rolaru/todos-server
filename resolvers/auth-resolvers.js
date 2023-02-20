const { GraphQLError } = require('graphql');
const bcrypt = require('bcrypt');

const redisHelper = require('./../helpers/redis-helper');
const authHelper = require('./../helpers/auth-helper');

const authResolvers = {};

authResolvers.mutations = {
  async login(root, { email, password }, { models }) {
    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: 'USER_NOT_FOUND',
          http: { status: 404 },
        }
      });
    }

    const doPasswordsMatch = await bcrypt.compare(password, user.password || '');

    if (!doPasswordsMatch) {
      throw new GraphQLError('Incorrect password', {
        extensions: {
          code: 'INVALID_PASSWORD',
          http: { status: 400 },
        }
      });
    }

    const token = await authHelper.createJwtToken({
      id: user.id,
      fullName: user.fullName,
      email
    });
    await redisHelper.set(email, token, process.env.ACCESS_TOKEN_TTL);

    return token;
  },

  async register(root, { email, password, fullName }, { models }) {
    const existingUser = await models.User.findOne({ where: { email } });

    if (existingUser) {
      throw new GraphQLError('User already exists', {
        extensions: {
          code: 'USER_ALREADY_EXISTS',
          http: { status: 400 },
        }
      });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    await models.User.create({
      email,
      fullName,
      password: await bcrypt.hash(password, salt)
    });

    const token = await authHelper.createJwtToken({ email, fullName });
    await redisHelper.set(email, token, process.env.ACCESS_TOKEN_TTL);

    return token;
  },
};

module.exports = authResolvers