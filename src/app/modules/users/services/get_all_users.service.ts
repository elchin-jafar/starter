import axiosInstance from "@/app/lib/axios.config";
import { validator } from "@/app/utils/validator";
import { endpoints } from "@/data/utils/endpoints";
import type { AllUsersResDTO } from "../res_dto/get_all_users.dto";
import { AllUsersSchema } from "../schemas/dto_validations/get_all_users.schema";

export type GetAllUsersParams = {
  limit: number;
  skip: number;
};

export const getAllUsersService = async ({
  limit,
  skip,
}: GetAllUsersParams) => {
  const res = await axiosInstance.get<AllUsersResDTO>(
    endpoints.users.getAllUsers(),
    { params: { limit, skip } },
  );

  return validator({
    endpoint: endpoints.users.getAllUsers(),
    schema: AllUsersSchema,
    response: res.data,
  });
};
