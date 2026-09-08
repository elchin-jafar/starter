import type { ZodType } from 'zod';

type ValidatorType<T> = {
  endpoint: string;
  schema: ZodType<any>;
  response: T;
};

export const validator = <T>({
  endpoint,
  schema,
  response,
}: ValidatorType<T>) => {
  const validatedDTO = schema.safeParse(response);
  if (!validatedDTO.success) {
    console.error(endpoint, validatedDTO.error.issues);
    throw new Error('Schema not correct');
  } else {
    return validatedDTO.data;
  }
};
