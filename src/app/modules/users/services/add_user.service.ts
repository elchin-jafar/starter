import { endpoints } from '../../../../data/utils/endpoints';
import axiosInstance from '../../../lib/axios.config';
import type { AddUserReqDTO } from '../req_dto/add_user.dto';

export const addUserService = async ({ data }: { data: AddUserReqDTO }) => {
  const res = await axiosInstance.post(endpoints.users.addUser(), data);

  return res.data;
};
