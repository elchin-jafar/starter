import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserRepository } from '../repositories';
import { toast } from '@heroui/react';

export const useDeleteUserApi = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => UserRepository.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success('User successfully deleted');
    },
  });
};
