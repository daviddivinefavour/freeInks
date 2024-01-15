import { EUserRole } from '@app/modules/user/types/user.types';

export enum EAuthenticatedUser {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export type TCreateAuthenticationAttributes = {
  id: string;
  password: string;
  authenticatedType: EAuthenticatedUser;
  authenticatedId: string;
  lastSeen?: string;
};

export interface IUserRegistrationOptions {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  role: EUserRole;
  password: string;
  confirmPassword: string;
}
