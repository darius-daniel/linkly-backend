import { Sequelize } from 'sequelize';
import { PostgresDialect } from '@sequelize/postgres';

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: 'linkly_db',
  user: 'default',
  password: 'irSv2BA9DjUg',
  host: 'ep-lucky-paper-a41r2r8q.us-east-1.aws.neon.tech',
  port: 5432,
  ssl: true,
  clientMinMessages: 'notice',
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
