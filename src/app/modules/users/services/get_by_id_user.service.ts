import { endpoints } from '../../../../data/utils/endpoints';
import axiosInstance from '../../../lib/axios.config';
import { validator } from '../../../utils/validator';
import type { UserResDTO } from '../res_dto/get_by_id_user.dto';
import { UserSchema } from '../schemas/dto_validations/get_by_id_user.schema';

export const getByIdUserService = async (id: number) => {
  const res = await axiosInstance.get<UserResDTO>(
    endpoints.users.getByIdUser(id),
  );

  return validator({
    endpoint: endpoints.users.getByIdUser(id),
    schema: UserSchema,
    response: res.data,
  });
};
