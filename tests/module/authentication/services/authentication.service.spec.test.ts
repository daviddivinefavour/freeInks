import authenticationService from '../../../../app/modules/authentication/services/authentication.service';
import userService from '../../../../app/modules/user/services/user.service';
import sinon from 'sinon';
import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import databaseSetup from '../../../test-helpers/database.setup';
import users from '../../../test-helpers/data/users';
import { TFunctionResult } from '../../../../app/utils/types';
import User from '../../../../app/modules/user/models/user.model';
import { EUserRole } from '../../../../app/modules/user/types/user.types';
import authenticationRepo from '../../../../app/modules/authentication/repositories/authentication.repo';
import userPermissionService from '../../../../app/modules/permission/services/user-permission.service';
import { v4 } from 'uuid';
import { EAuthenticatedUser } from '../../../../app/modules/authentication/types/authentication.types';
import helpers from '../../../../app/utils/helpers';
import token from '../../../../app/common/token';
import Authentication from '../../../../app/modules/authentication/models/authentication.model';

describe.only('Authentication Service Module', () => {
  before(async () => {
    await databaseSetup.testDatabaseConnection();
    await databaseSetup.runMigrationsForTestDatabase();
    await databaseSetup.clearSeederJsonForTestDatabase();
    await databaseSetup.runSeedersTestDatabase();
  });
  after(async () => {
    await databaseSetup.dropAllMigrationsForTestDatabase();
  });

  describe('UserRegistrationService()', () => {
    it('should return status 201 on completion, after registering a client', async () => {
      const userRegistrationDto = {
        firstName: faker.person.firstName('male'),
        lastName: faker.person.lastName('male'),
        email: faker.internet.email(),
        password: 'password',
        confirmPassword: 'password',
        role: EUserRole.READER,
      };

      // create stubs and spy instances
      const CreateUserServiceStub = sinon.stub(userService, 'CreateUserService').resolves({
        status: true,
        message: 'Successfully created new user',
        data: { id: v4(), ...userRegistrationDto } as unknown as User,
      } as TFunctionResult<User>);
      const CreateAuthenticationQueryStub = sinon.stub(authenticationRepo, 'CreateAuthenticationQuery').resolves({
        id: v4(),
        authenticatedId: v4(),
        authenticatedType: EAuthenticatedUser.CLIENT,
        password: helpers.hashString('password'),
      } as Authentication);
      const AddUserPermissionServiceStub = sinon.stub(userPermissionService, 'AddUserPermissionService').resolves({
        status: true,
        message: 'Successfully added permissions to target user',
        data: {},
      });
      const generateJWTTokenStub = sinon.stub(token, 'generateJWTToken').resolves({
        status: true,
        message: 'Successfully signed token',
        data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZmN2EyZDFiLTVhMTQtNDk4ZS05ZDMyLTljMThjMjIzZjViYiIsImVtYWlsIjoic2FyYWhAbWFpbC5jb20iLCJleHAiOjE4MTgyMzkwMjJ9.XSXV8JhoGscWbU_o_tjnpNwMO4_xQ8nyw1KteJTJZNY',
      });
      const UserRegistrationServiceSpy = sinon.spy(authenticationService.UserRegistrationService);

      const result = await UserRegistrationServiceSpy(userRegistrationDto);

      // assertions
      expect(UserRegistrationServiceSpy.calledOnceWithExactly(userRegistrationDto)).to.be.true;
      expect(CreateUserServiceStub.calledOnce).to.be.true;
      expect(AddUserPermissionServiceStub.calledOnce).to.be.true;
      expect(CreateAuthenticationQueryStub.calledOnce).to.be.true;
      expect(generateJWTTokenStub.calledOnce).to.be.true;
      expect(result.statusCode).to.be.deep.eq(201);
    });
  });
  describe('ForgotPasswordService()', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Should fail with status 422, when email is not found', async () => {
      const ForgotPasswordServiceSpy = sinon.spy(authenticationService.ForgotPasswordService);
      const email = faker.internet.email();

      const FindOneUserServiceStub = sinon.stub(userService, 'FindOneUserService').resolves({
        status: false,
        message: 'An error occurred',
      });
      const result = await ForgotPasswordServiceSpy(email);

      expect(ForgotPasswordServiceSpy.calledOnceWithExactly(email)).to.be.true;
      expect(FindOneUserServiceStub.calledOnce).to.be.true;
      expect(result.statusCode).to.be.deep.eq(422);
      expect(result.message).to.be.deep.eq('Invalid credentials');
    });
    it('Should pass with status 204, when email is found', async () => {
      const ForgotPasswordServiceSpy = sinon.spy(authenticationService.ForgotPasswordService);
      const email = users[0].email;

      const FindOneUserServiceStub = sinon.stub(userService, 'FindOneUserService').resolves({
        status: true,
        message: 'Successfully fetched user data',
        data: users[0],
      } as TFunctionResult<User>);
      const result = await ForgotPasswordServiceSpy(email);

      expect(ForgotPasswordServiceSpy.calledOnceWithExactly(email)).to.be.true;
      expect(FindOneUserServiceStub.calledOnce).to.be.true;
      expect(result.statusCode).to.be.deep.eq(204);
      expect(result.message).to.be.deep.eq('Successfully sent one time pin (OTP) to the provided email.');
    });
  });
});
