import { RevalidateTags } from "@/data/utils/revalidate_tags";
import { toast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRepository } from "../repositories";

export const useDeleteUserApi = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => UserRepository.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RevalidateTags.users.base });
      toast.success("User successfully deleted");
    },
  });
};
