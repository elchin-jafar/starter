import { useGetByIdUserApi } from "@/app/modules/users/api/getByIdUser.api";
import UserCard from "@/ui/features/user/UserCard";
import { Spinner, Typography } from "@heroui/react";
import { useParams } from "react-router";

const UserPage = () => {
  const { id } = useParams();

  const {
    data: user,
    isFetching,
    isSuccess,
  } = useGetByIdUserApi({ id: Number(id) });

  if (isFetching) return <Spinner />;

  if (!isSuccess) return;
  console.log("data", user);

  return (
    <>
      <div className="p-3">
        <Typography type="h1" className="mb-2">
          Single User
        </Typography>

        <UserCard user={user} />
      </div>
    </>
  );
};

export default UserPage;
