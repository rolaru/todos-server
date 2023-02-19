module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      content: {
        type: Sequelize.STRING
      },
      isDone: {
        type: Sequelize.BOOLEAN
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todo');
  }
};