const createResult = (isSuccess: boolean, data: any) => ({ isSuccess, ...data });

export const createFailureResult = (err: string) =>
  createResult(false, {
    status: 422,
    title: 'Oops something went wrong',
    message: err,
  });

export const createSuccessResult = ({
  status,
  title,
  message,
  entity,
}: {
  status: number;
  title: string;
  message: string;
  entity?: Record<string, any>;
}) =>
  createResult(true, {
    status,
    title,
    message,
    entity,
  });
