import { useQuery } from '@tanstack/react-query';
import { UserRepository } from '../repositories';

export const useGetAllUsersApi = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => UserRepository.getAllUsers(),
  });
};
