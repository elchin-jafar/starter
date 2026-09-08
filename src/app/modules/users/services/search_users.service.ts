import { endpoints } from "../../../../data/utils/endpoints";
import axiosInstance from "../../../lib/axios.config";
import { validator } from "../../../utils/validator";
import { AllUsersSchema } from "../schemas/dto_validations/get_all_users.schema";

export const searchUserService = async ({ query, limit, skip }: any) => {
  const res = await axiosInstance.get(endpoints.users.searchUser(), {
    params: { query, limit, skip },
  });

  return validator({
    endpoint: endpoints.users.searchUser(),
    schema: AllUsersSchema,
    response: res.data,
  });
};
