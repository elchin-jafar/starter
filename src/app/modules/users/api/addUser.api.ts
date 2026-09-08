import { toast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AddUserReqDTO } from '../req_dto/add_user.dto';
import { UserRepository } from '../repositories';

export const useAddUserApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddUserReqDTO) => UserRepository.addUser(data),
    onSuccess: () => {
      toast.success('User created');
      return queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.danger('Could not create user');
    },
  });
};
