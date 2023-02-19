const { Sequelize } = require('sequelize');

const dbHelper = {};

dbHelper.db;

dbHelper.connect = async () => {
  try {
    dbHelper.db = new Sequelize(
      `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );

    await dbHelper.db.authenticate();
    console.log('Database connection successful.');

    return dbHelper.db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return null;
  }
};

module.exports = dbHelper;