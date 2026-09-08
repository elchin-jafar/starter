import z from 'zod';

// Input schema for the add / edit user form (not the API response).
export const UserFormSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  age: z.coerce.number().int('Whole number').positive('Must be > 0').max(120),
  email: z.string().email('Invalid email'),
});

export type UserFormValues = z.infer<typeof UserFormSchema>;
