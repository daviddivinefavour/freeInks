export type TCreateOtp = {
  id: string;
  hashedOtp: string;
  expiredAt: string;
  userId: string;
  attempts: number;
};
