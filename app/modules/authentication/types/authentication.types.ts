export type TAuthenticatedUser = {
  ADMIN: 'admin';
  CLIENT: 'client';
};

export type TCreateAuthenticationAttributes = {
  id: string;
  password: string;
  authenticatedType: TAuthenticatedUser;
  authenticatedId: string;
  lastSeen?: string;
};
