import * as yup from 'yup';

export const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .transform(value => value.toLowerCase()),
  password: yup.string().required(),
});
