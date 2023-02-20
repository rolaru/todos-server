const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const redisHelper = require('./redis-helper');

const throwUnauthorizedError = () => {
  throw new GraphQLError('User is not authenticated', {
    extensions: {
      code: 'UNAUTHENTICATED',
      http: { status: 401 },
    },
  });
};

const authHelper = {};

authHelper.createJwtToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (error, token) => {
      if (error) {
        return reject(error);
      }
      return resolve(token);
    });
  });
};

authHelper.verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
};

authHelper.isUserLoggedIn = async (req) => {
  const authHeader = req.headers.authorization || '';
  const operation = req.body.operationName;

  // Don't need authentication validation on register or login operations
  if (operation === 'Login' || operation === 'Register') {
    return null;
  }

  if (typeof authHeader !== 'string' || authHeader.indexOf('Bearer') === -1) {
    return throwUnauthorizedError();
  }

  const token = authHeader.split(' ')[1];
  const user = await authHelper.verifyAccessToken(token);

  if (!user) {
    throwUnauthorizedError();
  }

  const redisUserToken = await redisHelper.get(user.email);

  if (!redisUserToken || token !== redisUserToken) {
    return throwUnauthorizedError();
  }

  return user;
};

module.exports = authHelper;