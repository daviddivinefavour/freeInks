import { IRequestWithUser } from '@app/utils/types';
import { Response } from 'express';
import { RegisterUserService } from '../services/authentication.service';
import { sendHttpResponse } from '@app/utils/respond';

export const RegisterUser = async (req: IRequestWithUser, res: Response): Promise<Response> => {
  const { firstName, lastName, email, phoneNumber, profileImageUrl, password, confirmPassword, role } = req.body;
  const httpServiceResponse = await RegisterUserService({
    firstName,
    lastName,
    email,
    phoneNumber,
    profileImageUrl,
    password,
    confirmPassword,
    role,
  });
  return sendHttpResponse(httpServiceResponse, res);
};
