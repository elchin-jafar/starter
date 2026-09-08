import { useDeleteUserApi } from "@/app/modules/users/api/deleteUser.api";
import type { UserModel } from "@/app/modules/users/models/get_all_users.model";

export const DeleteUserCellVM = (user: UserModel) => {
  const deleteMutation = useDeleteUserApi({ id: user.id });
  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return {
    handleDelete,
  };
};
