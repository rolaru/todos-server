const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const dbHelper = {};

dbHelper.db;

dbHelper.connect = async () => {
  try {
    dbHelper.db = new Sequelize(
      `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        define: {
          freezeTableName: true,
          createdAt: false,
          updatedAt: false
        }
      }
    );

    await dbHelper.db.authenticate();
    console.log('Database connection successful.');

    return dbHelper.db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return null;
  }
};

dbHelper.registerModels = () => {
  const currentFile = path.basename(__filename);
  const modelsDirectory = path.resolve(__dirname, '../models');
  const allModels = {};

  fs.readdirSync(modelsDirectory)
    .filter(file => {
      return  file.indexOf('.') !== 0 && file !== currentFile && file.slice(-3) === '.js';
    })
    .forEach(modelFile => {
      const ImportedModel = require(path.join(modelsDirectory, modelFile))(dbHelper.db);
      allModels[ImportedModel.name] = ImportedModel;
    });

  return allModels;
};

module.exports = dbHelper;