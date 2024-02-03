import Authentication from '../models/authentication.model';
import { TCreateAuthenticationAttributes } from '../types/authentication.types';

const CreateAuthenticationQuery = async (
  createAuthenticationDto: TCreateAuthenticationAttributes
): Promise<Authentication> => Authentication.create(createAuthenticationDto as Authentication);

const GetAuthenticationQuery = async (userId: string): Promise<Authentication | null> =>
  Authentication.findOne({
    where: {
      authenticatedId: userId,
    },
  });

export default { CreateAuthenticationQuery, GetAuthenticationQuery };
