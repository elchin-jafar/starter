import { RevalidateTags } from "@/data/utils/revalidate_tags";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UserRepository } from "../repositories";

export const DEFAULT_USERS_PAGE_SIZE = 20;

type UseGetAllUsersApiParams = {
  page: number;
  pageSize?: number;
  enabled?: boolean;
};

export const useGetAllUsersApi = ({
  page,
  pageSize = DEFAULT_USERS_PAGE_SIZE,
  enabled = true,
}: UseGetAllUsersApiParams) => {
  const skip = (page - 1) * pageSize;

  return useQuery({
    queryKey: RevalidateTags.users.list({ limit: pageSize, skip }),
    queryFn: () => UserRepository.getAllUsers({ limit: pageSize, skip }),
    enabled,
    placeholderData: keepPreviousData,
  });
};
