import axiosInstance from "@/app/lib/axios.config";
import { endpoints } from "@/data/utils/endpoints";

export const deleteUserService = async ({ id }: { id: number }) => {
  const res = await axiosInstance.delete(endpoints.users.deleteUser(id));

  return res.data;
};
