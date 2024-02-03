import { verifyJWTToken } from '@app/common/token';
import { EPermissions, TUserPermission } from '@app/modules/permission/types/permission.types';
import userRepo from '@app/modules/user/repositories/user.repo';
import { HTTP_401, HTTP_422 } from '@app/utils/http-response';
import { failingResult, passingResult, sendHttpResponse } from '@app/utils/respond';
import { NextFunction, Request, Response } from 'express';

interface tokenPayLoad {
  id: string;
  email: string;
  permissions: TUserPermission[];
}

let user: tokenPayLoad = {
  id: '',
  email: '',
  permissions: [],
};

const permissions: string[] = [];
for (const permission of Object.values(EPermissions)) {
  permissions.push(permission);
}

export const getBearerToken = (req: Request) => {
  const header = req.headers.authorization;
  if (!header) return failingResult('No token provided');

  const [schema, token] = header.split(' ');
  if (schema.toLowerCase() !== 'bearer') return failingResult('Invalid authorization token provided');

  return passingResult('Extracted bearer token from request header', token);
};

const addUserPropertyToReq = (req: Request, userObj: tokenPayLoad): void => {
  Object.assign(req, { user: { ...userObj } });
};

const authenticateUserRole = async (req: Request, userId: string, permission: string) => {
  const authUser = await userRepo.GetUserByIdQuery(userId);
  if (!authUser) return false;

  // check if user has the permission for accessing target resource
  if (permissions.includes(permission)) {
    user = { id: authUser.id, email: authUser.email, permissions: authUser.permissions };
    addUserPropertyToReq(req, user);
    return authUser;
  }
  return false;
};

const authorizeClient = (permission: string) => async (req: Request, res: Response, next: NextFunction) => {
  const generatedToken = getBearerToken(req);
  if (!generatedToken.status) return sendHttpResponse(HTTP_422(generatedToken.message), res);
  const validateToken = await verifyJWTToken(generatedToken.data as unknown as string);
  if (!validateToken.status) return sendHttpResponse(HTTP_401(validateToken.message), res);

  const tokenData = JSON.parse(JSON.stringify(validateToken.data));
  if (permissions.includes(permission)) {
    const authorizedUser = await authenticateUserRole(req, tokenData.id, permission);
    if (!authorizedUser) return sendHttpResponse(HTTP_401('Unauthorized access'), res);
    return next();
  }

  return sendHttpResponse(HTTP_401(), res);
};

export default { authorizeClient };
