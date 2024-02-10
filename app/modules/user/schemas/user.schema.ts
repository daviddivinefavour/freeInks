import * as yup from 'yup';

export const UserRegistrationValidationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().notRequired().nullable(),
  password: yup.string().min(8).required().nullable(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password')], `Passwords don't match`)
    .required('Confirm your password')
    .nullable(),
});
