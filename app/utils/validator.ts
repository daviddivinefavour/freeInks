import { validationError } from './errors';
import { failingResult, passingResult } from './respond';
import { ObjectSchema, ValidationError } from 'yup';

interface IValidatorOptions {
  schema: ObjectSchema<any>;
  payload: any;
}
export const requestBodyValidator = async ({ schema, payload }: IValidatorOptions) => {
  try {
    const validatedData = await schema.validate(payload);
    return passingResult('Validation successful', validatedData);
  } catch (error) {
    return failingResult(validationError(error as ValidationError).message);
  }
};
