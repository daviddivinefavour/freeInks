import { Response, Request } from 'express';
import { sendHttpResponse } from '@app/utils/respond';
import authenticationService from '../services/authentication.service';
import { EUserRole } from '@app/modules/user/types/user.types';
import { EAuthenticatedUser } from '../types/authentication.types';

const SignUpAsClient = async (req: Request, res: Response): Promise<Response> => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const { role } = req.query;

  const serviceResponse = await authenticationService.UserRegistrationService({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role: role as unknown as EUserRole,
  });

  return sendHttpResponse(serviceResponse, res);
};

const LoginAsClient = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const serviceResponse = await authenticationService.LoginService({
    email,
    password,
    type: EAuthenticatedUser.CLIENT,
  });

  return sendHttpResponse(serviceResponse, res);
};

export default { SignUpAsClient, LoginAsClient };
