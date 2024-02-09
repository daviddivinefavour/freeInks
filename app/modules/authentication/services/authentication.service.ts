import { v4 as uuid } from 'uuid';
import { EAuthenticatedUser, IUserRegistrationOptions } from '../types/authentication.types';
import { hashString } from '@app/utils/helpers';
import winston from 'winston';
import { failingResult, passingResult } from '@app/utils/respond';
import authenticationRepo from '../repositories/authentication.repo';
import { requestBodyValidator } from '@app/utils/validator';
import userService from '@app/modules/user/services/user.service';
import { HTTP_201, HTTP_401, HTTP_422 } from '@app/utils/http-response';
import { EUserRole } from '@app/modules/user/types/user.types';
import userPermissionService from '@app/modules/permission/services/user-permission.service';
import { EPermissions } from '@app/modules/permission/types/permission.types';
import { generateJWTToken } from '@app/common/token';

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
    password: hashString(otherRegistrationDto.password),
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
  const token = await generateJWTToken({
    id: user.data?.id,
    email: otherRegistrationDto.email,
  });
  if (!token.status) return HTTP_401(token.message);

  return HTTP_201({ customMessage: user.message, entity: { user: user.data, token: token.data } });
};

export default { UserRegistrationService };
