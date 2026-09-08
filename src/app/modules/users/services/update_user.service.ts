import { endpoints } from '../../../../data/utils/endpoints';
import axiosInstance from '../../../lib/axios.config';
import type { UpdateUserReqDTO } from '../req_dto/update_user.dto';

export const updateUserService = async (id: number, body: UpdateUserReqDTO) => {
  const res = await axiosInstance.patch(endpoints.users.updateUser(id), body);

  return res.data;
};
