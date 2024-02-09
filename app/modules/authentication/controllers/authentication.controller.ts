import { Response, Request } from 'express';
import { sendHttpResponse } from '@app/utils/respond';
import authenticationService from '../services/authentication.service';
import { EUserRole } from '@app/modules/user/types/user.types';

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

export default { SignUpAsClient };
