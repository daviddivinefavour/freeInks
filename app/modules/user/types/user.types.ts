export type TCreateUserAttributes = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  isEmailVerified?: boolean;
  verifiedAt?: string;
  status: EUserStatus;
  profileImageUrl?: string;
  role: EUserRole;
};

export interface ISignUpOptions {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export enum EUserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum EUserRole {
  AUTHOR = 'author',
  READER = 'reader',
}
