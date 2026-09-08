import { useAddUserApi } from "@/app/modules/users/api/addUser.api";
import { useUpdateUserApi } from "@/app/modules/users/api/updateUser.api";
import type { UserModel } from "@/app/modules/users/models/get_all_users.model";
import type { UserFormValues } from "@/app/modules/users/schemas/dto_validations/user_form.schema";

type Params = {
  user?: UserModel;
  onDone: () => void;
};

const emptyValues: UserFormValues = {
  firstName: "",
  lastName: "",
  age: 0,
  email: "",
};

export const UserFormModalVM = ({ user, onDone }: Params) => {
  const isEdit = Boolean(user);

  const addMutation = useAddUserApi();
  const updateMutation = useUpdateUserApi();

  const defaultValues: UserFormValues = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
      }
    : emptyValues;

  const handleSubmit = (values: UserFormValues) => {
    if (user) {
      updateMutation.mutate(
        { id: user.id, data: values },
        { onSuccess: onDone },
      );
    } else {
      addMutation.mutate(values, { onSuccess: onDone });
    }
  };

  return {
    title: isEdit ? "Edit user" : "Add user",
    submitLabel: isEdit ? "Save changes" : "Create",
    defaultValues,
    isPending: addMutation.isPending || updateMutation.isPending,
    handleSubmit,
  };
};
