import { endpoints } from '../../../../data/utils/endpoints';
import axiosInstance from '../../../lib/axios.config';
import { validator } from '../../../utils/validator';
import type { AllUsersResDTO } from '../res_dto/get_all_users.dto';
import { AllUsersSchema } from '../schemas/dto_validations/get_all_users.schema';

export const getAllUsersService = async () => {
  const res = await axiosInstance.get<AllUsersResDTO>(
    endpoints.users.getAllUsers(),
  );

  return validator({
    endpoint: endpoints.users.getAllUsers(),
    schema: AllUsersSchema,
    response: res.data,
  });
};
