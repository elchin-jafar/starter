import axiosInstance from "@/app/lib/axios.config";
import { validator } from "@/app/utils/validator";
import { endpoints } from "@/data/utils/endpoints";
import type { AllUsersResDTO } from "../res_dto/get_all_users.dto";
import { AllUsersSchema } from "../schemas/dto_validations/get_all_users.schema";
import type { GetAllUsersParams } from "./get_all_users.service";

export type SearchUsersParams = GetAllUsersParams & {
  q: string;
};

export const searchUserService = async ({
  q,
  limit,
  skip,
}: SearchUsersParams) => {
  const res = await axiosInstance.get<AllUsersResDTO>(
    endpoints.users.searchUser(),
    { params: { q, limit, skip } },
  );

  return validator({
    endpoint: endpoints.users.searchUser(),
    schema: AllUsersSchema,
    response: res.data,
  });
};
