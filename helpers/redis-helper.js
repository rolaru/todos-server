const redis = require('redis');

const redisHelper = {};

redisHelper.redisClient = null;

redisHelper.createRedisCient = async () => {
  redisHelper.redisClient = redis.createClient();

  // If Redis fails throw error and exit the app
  redisHelper.redisClient.on('error', (error) => {
    redisService.logError(error);
    process.exit(1);
  });

  // If the Redis connection is successful then log a message
  redisHelper.redisClient.on('ready', () => {
    console.log('Listening to Redis server on port 6379...');
  });

  await redisHelper.redisClient.connect();
};

redisHelper.set = (key, value, expiry = null) => {
  if (expiry) {
    return redisHelper.redisClient.set(key, value, { EX: expiry });
  } else {
    return redisHelper.redisClient.set(key, value);
  }
};

redisHelper.get = (key) => redisHelper.redisClient.get(key);

redisHelper.delete = (key) => redisHelper.redisClient.del(key);

module.exports = redisHelper;
