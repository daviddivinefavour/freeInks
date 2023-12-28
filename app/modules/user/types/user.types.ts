export type TCreateUserAttributes = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  isEmailVerified: boolean;
  verifiedAt?: string;
  status: EUserStatus;
  profileImageUrl?: string;
  role: EUserRole;
};

export enum EUserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum EUserRole {
  AUTHOR = 'author',
  READER = 'reader',
}
