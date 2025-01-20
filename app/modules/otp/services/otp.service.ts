import config from '@app/config/config';
import helpers from '@app/utils/helpers';
import { requestBodyValidator } from '@app/utils/validator';
import moment from 'moment';
import { v4 } from 'uuid';
import { failingResult, passingResult } from '@app/utils/respond';
import otpRepo from '../repositories/otp.repo';
import { verifyOtpSchema } from '../schema/otp.schema';

if (!config.globals.NODE_ENV) config.globals.NODE_ENV = 'development';
const isDevelopment = config.globals.NODE_ENV === 'development' ? true : false;

const CreateOtpService = async (userId: string) => {
  const generatedOtp = isDevelopment ? '100000' : String(helpers.generateRandomDigits(6));
  const expiredAt = moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss').toString();
  const hashedOtp = helpers.hashString(generatedOtp);

  const savedOtp = await otpRepo.CreateOtpQuery({
    id: v4(),
    hashedOtp,
    userId,
    expiredAt,
    attempts: 0,
  });
  if (!savedOtp) return failingResult('Oops! unable to generate one time pin');

  return passingResult('Successfully generated one time pin', generatedOtp);
};

const ValidateOtpService = async ({ userId, otp }: { userId: string; otp: string }) => {
  const validatedDto = await requestBodyValidator({ payload: { userId, otp }, schema: verifyOtpSchema });
  if (!validatedDto.status) return failingResult(validatedDto.message);

  const otpDetails = await otpRepo.FindOtpQuery(userId);
  if (!otpDetails) return failingResult('Invalid one time pin (otp) provided');
  if (otpDetails.attempts < 5) {
    await otpDetails.increment('attempts');
  } else {
    return failingResult('OTP has exceeded usage limit, request for new otp.');
  }

  const otpMatches = helpers.compareHashedString(otp, otpDetails.hashedOtp);
  if (!otpMatches) return failingResult('Invalid one time pin (otp) provided');
  if (moment().isAfter(otpDetails.expiredAt)) return failingResult('One time password (otp) expired.');

  await otpRepo.DeleteOtpQuery(userId);
  return passingResult('Otp verified successfully', true);
};

export default { CreateOtpService, ValidateOtpService };
