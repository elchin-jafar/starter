import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RevalidateTags } from '../../../../data/utils/revalidate_tags';
import { UserRepository } from '../repositories';
import { DEFAULT_USERS_PAGE_SIZE } from './getAllUsers.api';

type UseSearchUsersApiParams = {
  q: string;
  page: number;
  pageSize?: number;
};

export const useSearchUsersApi = ({
  q,
  page,
  pageSize = DEFAULT_USERS_PAGE_SIZE,
}: UseSearchUsersApiParams) => {
  const query = q.trim();
  const skip = (page - 1) * pageSize;

  return useQuery({
    queryKey: RevalidateTags.users.search({ q: query, limit: pageSize, skip }),
    queryFn: () =>
      UserRepository.searchUser({ q: query, limit: pageSize, skip }),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });
};
