import Otp from '../models/otp.model';
import { TCreateOtp } from '../types/otp.types';

const CreateOtpQuery = async (createOtpDto: TCreateOtp): Promise<Otp> => {
  const [otp, created] = await Otp.findOrCreate({
    where: { userId: createOtpDto.userId },
    defaults: { ...(createOtpDto as Partial<TCreateOtp>) } as Otp,
  });
  const details: Omit<TCreateOtp, 'id'> = createOtpDto;
  if (!created) await Otp.update(details, { where: { userId: createOtpDto.userId } });
  return otp;
};

const FindOtpQuery = async (userId: string): Promise<Otp | null> =>
  Otp.findOne({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });

const DeleteOtpQuery = async (userId: string): Promise<number> => Otp.destroy({ where: { userId } });

export default { CreateOtpQuery, FindOtpQuery, DeleteOtpQuery };
