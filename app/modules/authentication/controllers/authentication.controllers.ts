import { Response, Request } from 'express';
import { sendHttpResponse } from '@app/utils/respond';
import userService from '@app/modules/user/services/user.service';
import { HTTP_201, HTTP_401, HTTP_422 } from '@app/utils/http-response';
import authenticationService from '../services/authentication.service';
import { generateJWTToken } from '@app/common/token';
import userPermissionService from '@app/modules/permission/services/user-permission.service';
import { EPermissions } from '@app/modules/permission/types/permission.types';
import { EUserRole } from '@app/modules/user/types/user.types';

export const SignUpAsClient = async (req: Request, res: Response): Promise<Response> => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const { role } = req.query;

  // create user
  const user = await userService.CreateUserService(
    {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    },
    role
  );
  if (!user.status) return sendHttpResponse(HTTP_422(user.message), res);

  // save user auth credentials
  const userAuth = await authenticationService.CreateUserAuthenticationService({ userId: user.data?.id, password });
  if (!userAuth.status) {
    await userService.DeleteUserService(user.data?.id);
    return sendHttpResponse(HTTP_422(userAuth.message), res);
  }

  // assign user permissions
  const userAccessPermissions =
    role === EUserRole.AUTHOR
      ? await userPermissionService.AddUserPermissionService({
          userId: user.data?.id,
          permissions: [
            EPermissions.GENERAL_AUTHENTICATE, // for access to free and unsecured resources
            EPermissions.AUTHOR_MANAGE_ARTICLES, //  for reader access
          ],
        })
      : await userPermissionService.AddUserPermissionService({
          userId: user.data?.id,
          permissions: [
            EPermissions.GENERAL_AUTHENTICATE, // for access to free and unsecured resources
            EPermissions.READER_ACCESS_CONTENT, //  for reader access
          ],
        });
  if (!userAccessPermissions.status) return sendHttpResponse(HTTP_422(userAccessPermissions.message), res);

  // generate auth token
  const token = await generateJWTToken({
    id: user.data?.id,
    email,
  });
  if (!token.status) return sendHttpResponse(HTTP_401(token.message), res);

  return sendHttpResponse(
    HTTP_201({ customMessage: user.message, entity: { user: user.data, token: token.data } }),
    res
  );
};
