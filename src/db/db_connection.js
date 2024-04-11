import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('Linkly', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}

// Call the testConnection function to test the connection
testConnection();

export default sequelize;
