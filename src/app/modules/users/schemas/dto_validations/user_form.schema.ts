import z from 'zod';

export const UserFormSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  age: z.coerce.number().int('Whole number').positive('Must be > 0').max(120),
  email: z.email('Invalid email'),
});

export type UserFormValues = z.infer<typeof UserFormSchema>;
