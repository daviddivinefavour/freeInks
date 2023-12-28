import { exec } from 'child_process';
import util from 'util';
import { db as sequelize } from '../../src/config/database';

const execute = util.promisify(exec);

const dropDb = `npm run db:drop --env=test`;
const createDb = `npm run db:create  --env=test`;
const migrateDb = `npm run db:migrate  --env=test`;
const seedDb = `npm run db:seed  --env=test`;
const deleteSeededRecord = `echo "" && echo "" && echo "[]"> sequelizeSeedData.json`;
const undoAllDbMigrations = `npm run db:migrate:undo:all  --env=test`;
const undoAllDbSeeders = `npm run db:seed:undo:all  --env=test`;
/*
 * This function is called after all tests are done running.
 * You can use this to close the database connection.
 */
const closeDatabaseConnection = async () => {
  await sequelize.close();
};

/*
 * This function is called before any tests are run.
 * You can use this to test the database connection before running tests.
 */
const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Error testing the database connection:', error);
    throw error;
  }
};

const dropTestDatabase = async () => {
  try {
    await execute(dropDb);
  } catch (error) {
    console.error('Error executing command:', error);
  }
};

const createTestDatabase = async () => {
  try {
    await execute(createDb);
  } catch (error) {
    console.error('Error executing command:', error);
  }
};

const runMigrationsForTestDatabase = async () => {
  try {
    await execute(migrateDb);
  } catch (error) {
    console.error('Error executing command:', error);
  }
};
const dropAllMigrationsForTestDatabase = async () => {
  try {
    await execute(undoAllDbMigrations);
  } catch (error) {
    console.error('Error executing command:', error);
  }
};
const revertAllSeedersForTestDatabase = async () => {
  try {
    await execute(undoAllDbSeeders);
  } catch (error) {
    console.error('Error executing command:', error);
  }
};

const runSeedersTestDatabase = async () => {
  try {
    await execute(seedDb);
  } catch (error) {
    console.error('Error executing command:', error);
  }
};
const clearSeederJsonForTestDatabase = async () => {
  try {
    await execute(deleteSeededRecord);
  } catch (error) {
    console.error('Error executing command:', error);
  }
};

export {
  testDatabaseConnection,
  dropAllMigrationsForTestDatabase,
  runMigrationsForTestDatabase,
  revertAllSeedersForTestDatabase,
  runSeedersTestDatabase,
  clearSeederJsonForTestDatabase,
};
