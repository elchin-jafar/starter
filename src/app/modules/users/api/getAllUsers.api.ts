import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { UserRepository } from '../repositories';

export const DEFAULT_USERS_PAGE_SIZE = 20;

type UseGetAllUsersApiParams = {
  page: number;
  pageSize?: number;
};

export const useGetAllUsersApi = ({
  page,
  pageSize = DEFAULT_USERS_PAGE_SIZE,
}: UseGetAllUsersApiParams) => {
  const skip = (page - 1) * pageSize;

  return useQuery({
    queryKey: ['users', { limit: pageSize, skip }],
    queryFn: () => UserRepository.getAllUsers({ limit: pageSize, skip }),
    placeholderData: keepPreviousData,
  });
};
