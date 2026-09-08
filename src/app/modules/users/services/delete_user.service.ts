import { endpoints } from '../../../../data/utils/endpoints';
import axiosInstance from '../../../lib/axios.config';

export const deleteUserService = async ({ id }: { id: number }) => {
  const res = await axiosInstance.delete(endpoints.users.deleteUser(id));

  return res.data;
};
