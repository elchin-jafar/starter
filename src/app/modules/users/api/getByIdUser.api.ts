import { useQuery } from '@tanstack/react-query';
import { RevalidateTags } from '../../../../data/utils/revalidate_tags';
import { UserRepository } from '../repositories';

export const useGetByIdUserApi = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: RevalidateTags.users.byId(id),
    queryFn: () => UserRepository.getByIdUser(id),
    enabled: !!id,
  });
};
