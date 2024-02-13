import authenticationService from '../../../../app/modules/authentication/services/authentication.service';
import sinon from 'sinon';
import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import databaseSetup from '../../../test-helpers/database.setup';

describe('Authentication Service Module', () => {
  before(async () => {
    await databaseSetup.testDatabaseConnection();
    await databaseSetup.runMigrationsForTestDatabase();
    await databaseSetup.clearSeederJsonForTestDatabase();
    await databaseSetup.runSeedersTestDatabase();
  });
  after(async () => {
    await databaseSetup.dropAllMigrationsForTestDatabase();
  });
  describe('ForgotPasswordService()', () => {
    it('Should fail with status 422, when email is not found', async () => {
      const ForgotPasswordServiceSpy = sinon.spy(authenticationService.ForgotPasswordService);
      const email = faker.internet.email();

      const result = await ForgotPasswordServiceSpy(email);
      expect(ForgotPasswordServiceSpy.calledOnceWithExactly(email)).to.be.true;
      expect(result.statusCode).to.be.deep.eq(422);
      expect(result.message).to.be.deep.eq('Invalid credentials');
    });
  });
});
