import { IRequestWithUser } from '@app/utils/types';
import { Response } from 'express';
import { sendHttpResponse } from '@app/utils/respond';
import userService from '@app/modules/user/services/user.service';
import { HTTP_201, HTTP_422 } from '@app/utils/http-response';
import authenticationService from '../services/authentication.service';

export const SignUpAsClient = async (req: IRequestWithUser, res: Response): Promise<Response> => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const { role } = req.query;
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
  const userAuth = await authenticationService.CreateUserAuthenticationService({ userId: user.data?.id, password });
  if (!userAuth.status) {
    await userService.DeleteUserService(user.data?.id);
    return sendHttpResponse(HTTP_422(userAuth.message), res);
  }
  return sendHttpResponse(HTTP_201({ customMessage: user.message, entity: user.data }), res);
};
