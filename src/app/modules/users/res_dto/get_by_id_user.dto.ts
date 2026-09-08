import type z from 'zod';
import type { UserSchema } from '../schemas/dto_validations/get_by_id_user.schema';

export type UserResDTO = z.infer<typeof UserSchema>;
