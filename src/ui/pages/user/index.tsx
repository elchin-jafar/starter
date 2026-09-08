import { Spinner, Typography } from '@heroui/react';
import { useGetByIdUserApi } from '../../../app/modules/users/api/getByIdUser.api';
import { useParams } from 'react-router';
import UserCard from '../../features/user/UserCard';

const UserPage = () => {
  const { id } = useParams();

  const {
    data: user,
    isFetching,
    isSuccess,
  } = useGetByIdUserApi({ id: Number(id) });

  if (isFetching) return <Spinner />;

  if (!isSuccess) return;
  console.log('data', user);

  return (
    <>
      <div className="p-3">
        <Typography type="h1">Single User</Typography>

        <UserCard user={user} />
      </div>
    </>
  );
};

export default UserPage;
