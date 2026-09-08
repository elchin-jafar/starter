import { RevalidateTags } from "@/data/utils/revalidate_tags";
import { toast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRepository } from "../repositories";
import type { UpdateUserReqDTO } from "../req_dto/update_user.dto";

type UpdateUserVars = { id: number; data: UpdateUserReqDTO };

export const useUpdateUserApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateUserVars) =>
      UserRepository.updateUser(id, data),
    onSuccess: (_res, { id }) => {
      toast.success("User updated");
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: RevalidateTags.users.base }),
        queryClient.invalidateQueries({
          queryKey: RevalidateTags.users.byId(id),
        }),
      ]);
    },
    onError: () => {
      toast.danger("Could not update user");
    },
  });
};
