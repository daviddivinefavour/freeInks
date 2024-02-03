export type TCreateUserAttributes = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: EUserStatus;
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
