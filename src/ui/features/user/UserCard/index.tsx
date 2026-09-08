import type { UserModel } from "@/app/modules/users/models/get_all_users.model";
import { Button, Card } from "@heroui/react";
import { Link } from "react-router";

const UserCard = ({ user }: { user: UserModel }) => {
  return (
    <Card className="relative col-span-12 max-w-80 h-62.5 sm:h-75 md:col-span-8 md:h-87.5">
      <img
        alt="user"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        src={user.image}
      />
      <Card.Footer className="z-10 mt-auto flex items-end justify-between">
        <div className="bg-white p-3 rounded-2xl border-2">
          <div className="text-base font-medium text-black sm:text-lg">
            {user.firstName}
          </div>
          <div className="text-xs font-medium text-black/50 sm:text-sm">
            {user.age}
          </div>
        </div>
        <Link to="/">
          <Button size="sm" variant="primary">
            Go Back
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default UserCard;
