import axiosInstance from "@/app/lib/axios.config";
import { endpoints } from "@/data/utils/endpoints";
import type { UpdateUserReqDTO } from "../req_dto/update_user.dto";

export const updateUserService = async (id: number, body: UpdateUserReqDTO) => {
  const res = await axiosInstance.put(endpoints.users.updateUser(id), body);

  return res.data;
};
