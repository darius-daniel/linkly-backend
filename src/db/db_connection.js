import { Sequelize } from 'sequelize';
import { PostgresDialect } from '@sequelize/postgres';

const sequelize = new Sequelize('Linkly', 'darius', 'D9G8Va9PY7MSVL6Li%40iu', {
  host: 'nnwplcuask.sqlite.cloud:8860',
  dialect: 'sqlite',
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}

// Call the testConnection function to test the connection
testConnection();

export default sequelize;
