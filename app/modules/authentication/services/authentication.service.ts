import { v4 as uuid } from 'uuid';
import { EAuthenticatedUser, ILoginOptions, IUserRegistrationOptions } from '../types/authentication.types';
import winston from 'winston';
import authenticationRepo from '../repositories/authentication.repo';
import userService from '@app/modules/user/services/user.service';
import { HTTP_200, HTTP_201, HTTP_204, HTTP_400, HTTP_401, HTTP_422 } from '@app/utils/http-response';
import { EUserRole } from '@app/modules/user/types/user.types';
import userPermissionService from '@app/modules/permission/services/user-permission.service';
import { EPermissions } from '@app/modules/permission/types/permission.types';
import { LoginValidationSchema } from '../schemas/authentication.schema';
import { requestBodyValidator } from '@app/utils/validator';
import helpers from '@app/utils/helpers';
import token from '@app/common/token';

const UserRegistrationService = async (userRegistrationDto: IUserRegistrationOptions) => {
  const { role, ...otherRegistrationDto } = userRegistrationDto;
  // create user
  const user = await userService.CreateUserService(otherRegistrationDto, role);
  if (!user.status) return HTTP_422(user.message);

  // save user auth credentials
  const userAuth = await authenticationRepo.CreateAuthenticationQuery({
    id: uuid(),
    authenticatedId: user.data?.id,
    authenticatedType: EAuthenticatedUser.CLIENT,
    password: helpers.hashString(otherRegistrationDto.password),
  });
  if (!userAuth) {
    winston.error('Failed to create user authentication');
    await userService.DeleteUserService(user.data?.id);
    return HTTP_422();
  }

  // assign user permissions
  const userAccessPermissions =
    role === EUserRole.AUTHOR
      ? await userPermissionService.AddUserPermissionService({
          userId: user.data?.id,
          permissions: [
            EPermissions.GENERAL_AUTHENTICATE, // for access to free and unsecured resources
            EPermissions.AUTHOR_MANAGE_ARTICLES, //  for author access
          ],
        })
      : await userPermissionService.AddUserPermissionService({
          userId: user.data?.id,
          permissions: [
            EPermissions.GENERAL_AUTHENTICATE, // for access to free and unsecured resources
            EPermissions.READER_ACCESS_CONTENT, //  for reader access
          ],
        });
  if (!userAccessPermissions.status) return HTTP_422(userAccessPermissions.message);

  // generate auth token
  const authToken = await token.generateJWTToken({
    id: user.data?.id,
    email: otherRegistrationDto.email,
  });
  if (!authToken.status) return HTTP_401(authToken.message);

  return HTTP_201({ customMessage: user.message, entity: { user: user.data, token: authToken.data } });
};

const LoginService = async (loginDto: ILoginOptions) => {
  const validatedDto = await requestBodyValidator({ payload: loginDto, schema: LoginValidationSchema });
  if (!validatedDto.status) return HTTP_400(validatedDto.message);

  const user = await userService.FindOneUserService({ email: loginDto.email });
  if (!user.status) return HTTP_422(user.message);

  const authUser = await authenticationRepo.GetAuthenticationQuery(user.data?.id);
  if (!authUser) return HTTP_422();
  if (!helpers.compareHashedString(loginDto.password, authUser.password)) return HTTP_422();

  // generate auth token
  const authToken = await token.generateJWTToken({
    id: user.data?.id,
    email: loginDto.email,
  });
  if (!authToken.status) return HTTP_401(authToken.message);

  return HTTP_200({ customMessage: 'Logged in successfully.', entity: { user: user.data, token: authToken.data } });
};

const ForgotPasswordService = async (email: string) => {
  const user = await userService.FindOneUserService({ email });
  if (!user.status) return HTTP_422('Invalid credentials');

  /*
   *logic to create otp tied to user and send to users email
   */
  return HTTP_204('Successfully sent one time pin (OTP) to the provided email.');
};
export default { UserRegistrationService, LoginService, ForgotPasswordService };
