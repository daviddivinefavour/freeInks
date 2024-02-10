import * as yup from 'yup';

export const LoginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
