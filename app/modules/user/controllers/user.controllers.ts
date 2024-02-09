import { IRequestWithUser } from '@app/utils/types';
import { Response, Request } from 'express';
import { sendHttpResponse } from '@app/utils/respond';
import userService from '@app/modules/user/services/user.service';
import { HTTP_200, HTTP_422 } from '@app/utils/http-response';

export const GetUser = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  const serviceResponse = await userService.GetUserByIdService(userId);
  if (!serviceResponse.status) return sendHttpResponse(HTTP_422(serviceResponse.message), res);
  return sendHttpResponse(HTTP_200({ customMessage: serviceResponse.message, entity: serviceResponse.data }), res);
};

export const GetAuthenticatedUser = async (req: IRequestWithUser, res: Response): Promise<Response> => {
  const userId = req.user.id;
  const serviceResponse = await userService.GetUserByIdService(userId);
  if (!serviceResponse.status) return sendHttpResponse(HTTP_422(serviceResponse.message), res);
  return sendHttpResponse(HTTP_200({ customMessage: serviceResponse.message, entity: serviceResponse.data }), res);
};
