import type { UserModel } from "@/app/modules/users/models/get_all_users.model";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Popover } from "@heroui/react";
import { DeleteUserCellVM } from "./delete_user_cell.vm";

const DeleteUserCell = ({ user }: { user: UserModel }) => {
  const { handleDelete } = DeleteUserCellVM(user);
  return (
    <Popover>
      <Popover.Trigger>
        <Button
          isIconOnly
          size="sm"
          variant="danger-soft"
          aria-label={`Delete ${user.firstName} ${user.lastName}`}
        >
          <TrashIcon className="size-4" />
        </Button>
      </Popover.Trigger>

      <Popover.Content>
        <Popover.Dialog>
          <div className="flex flex-col gap-3 p-1">
            <Popover.Heading className="text-sm font-medium">
              {`Deleting ${user.firstName} ${user.lastName}?`}
            </Popover.Heading>
            <div className="flex justify-end gap-2">
              <Button slot="close" size="sm" variant="ghost">
                No
              </Button>
              <Button
                slot="close"
                size="sm"
                variant="danger"
                onPress={handleDelete}
              >
                Yes
              </Button>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};

export default DeleteUserCell;
