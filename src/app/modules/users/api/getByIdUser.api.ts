import { useQuery } from '@tanstack/react-query';
import { UserRepository } from '../repositories';

export const useGetByIdUserApi = ({ id }: { id: number }) => {
  console.log('id', id);

  return useQuery({
    queryKey: ['userById', id],
    queryFn: () => UserRepository.getByIdUser(id),
    enabled: !!id,
  });
};
