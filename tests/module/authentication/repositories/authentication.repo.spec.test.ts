import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import databaseSetup from '../../../test-helpers/database.setup';
import authenticationRepo from '../../../../app/modules/authentication/repositories/authentication.repo';
import userRepo from '../../../../app/modules/user/repositories/user.repo';
import { EAuthenticatedUser } from '../../../../app/modules/authentication/types/authentication.types';
import User from '../../../../app/modules/user/models/user.model';
import { EUserRole, EUserStatus } from '../../../../app/modules/user/types/user.types';
import { v4 } from 'uuid';

describe('Authentication Repository Module', () => {
  let dummyUser: User;
  before(async () => {
    await databaseSetup.testDatabaseConnection();
    await databaseSetup.runMigrationsForTestDatabase();
    await databaseSetup.clearSeederJsonForTestDatabase();
    await databaseSetup.runSeedersTestDatabase();

    dummyUser = await userRepo.CreateUserQuery({
      id: v4(),
      firstName: faker.person.firstName('male'),
      lastName: faker.person.lastName('male'),
      email: faker.internet.email(),
      status: EUserStatus.INACTIVE,
      role: EUserRole.READER,
    });
  });

  after(async () => {
    await databaseSetup.dropAllMigrationsForTestDatabase();
  });

  describe('CreateAuthenticationQuery()', () => {
    it('Should create a new record in the authentications table for a client', async () => {
      const authUser = await authenticationRepo.CreateAuthenticationQuery({
        id: v4(),
        password: 'password',
        authenticatedType: EAuthenticatedUser.CLIENT,
        authenticatedId: dummyUser.id,
        lastSeen: new Date().toISOString(),
      });

      expect(authUser).to.exist;
      expect(authUser).to.be.an('object');
      expect(authUser.authenticatedId).to.be.deep.eq(dummyUser.id);
    });
  });
  describe('GetAuthenticationQuery()', () => {
    it('should fetch an existing record from the authentication table', async () => {
      const authUser = await authenticationRepo.GetAuthenticationQuery(dummyUser.id);
      expect(authUser).to.exist;
      expect(authUser).to.be.an('object');
      expect(authUser?.authenticatedId).to.be.deep.eq(dummyUser.id);
    });
    it('Should return null if no record matches the query', async () => {
      const authUser = await authenticationRepo.GetAuthenticationQuery(v4());
      expect(authUser).to.not.exist;
    });
  });
});
