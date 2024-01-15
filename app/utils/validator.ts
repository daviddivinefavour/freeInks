import { validationError } from './errors';
import { passingResult } from './respond';
import { ObjectSchema } from 'yup';

interface IValidatorOptions {
  schema: ObjectSchema<any>;
  payload: any;
}
export const requestBodyValidator = ({ schema, payload }: IValidatorOptions) =>
  schema
    .validate(payload)
    .then(res => passingResult('Validation successful', res))
    .catch(error => validationError(error));
