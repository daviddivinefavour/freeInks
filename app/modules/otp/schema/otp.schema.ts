import * as yup from 'yup';

export const verifyOtpSchema: yup.ObjectSchema<any> = yup.object().shape({
  userId: yup.string().required('User ID is mandatory'),
  otp: yup.string().required('Otp is mandatory'),
});
