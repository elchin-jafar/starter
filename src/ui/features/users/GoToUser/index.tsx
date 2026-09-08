import type { UserModel } from "@/app/modules/users/models/get_all_users.model";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { Link } from "react-router";

const GoToUserCell = ({ user }: { user: UserModel }) => {
  return (
    <>
      <Link to={`/user/${user.id}`}>
        <Button isIconOnly size="sm" variant="secondary">
          <ArrowUpRightIcon />
        </Button>
      </Link>
    </>
  );
};

export default GoToUserCell;
