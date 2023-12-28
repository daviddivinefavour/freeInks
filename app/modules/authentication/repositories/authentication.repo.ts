import Authentication from '../models/authentication.model';
import { TCreateAuthenticationAttributes } from '../types/authentication.types';

export const CreateAuthenticationQuery = async (
  createAuthenticationDto: TCreateAuthenticationAttributes
): Promise<Authentication> => Authentication.create(createAuthenticationDto as Authentication);

export const GetAuthenticationQuery = async (userId: string): Promise<Authentication | null> =>
  Authentication.findOne({
    where: {
      authenticatedId: userId,
    },
  });
