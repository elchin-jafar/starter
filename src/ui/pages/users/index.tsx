import {
  Button,
  Spinner,
  Table,
  Typography,
  useOverlayState,
} from '@heroui/react';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useGetAllUsersApi } from '../../../app/modules/users/api/getAllUsers.api';
import type { UserModel } from '../../../app/modules/users/models/get_all_users.model';
import DeleteUserCell from '../../features/users/DeleteUserCell';
import GoToUserCell from '../../features/users/GoToUser';
import UserFormModal from '../../features/users/UserFormModal';

const AllUsersPage = () => {
  const { data, isFetching, isError, isSuccess } = useGetAllUsersApi();

  const formModal = useOverlayState();
  const [editingUser, setEditingUser] = useState<UserModel | undefined>(
    undefined,
  );

  const openAdd = () => {
    setEditingUser(undefined);
    formModal.open();
  };

  const openEdit = (user: UserModel) => {
    setEditingUser(user);
    formModal.open();
  };

  if (isError) throw new Error('Something went wrong');

  if (isFetching) return <Spinner />;

  if (!isSuccess) return null;

  return (
    <div className="p-3">
      <div className="w-3xl flex justify-between">
        <Typography type="h1">Users</Typography>
        <Button
          isIconOnly
          variant="primary"
          aria-label="Add user"
          onPress={openAdd}
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>
      <div className="w-3xl mt-1">
        <Table>
          <Table.ScrollContainer className="max-h-[70vh] overflow-y-auto">
            <Table.Content aria-label="users">
              <Table.Header>
                <Table.Column>Name</Table.Column>
                <Table.Column>Surname</Table.Column>
                <Table.Column>Age</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {data.users.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.age}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="secondary"
                          aria-label={`Edit ${user.firstName} ${user.lastName}`}
                          onPress={() => openEdit(user)}
                        >
                          <PencilSquareIcon className="size-4" />
                        </Button>
                        <DeleteUserCell user={user} />
                        <GoToUserCell user={user} />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      <UserFormModal state={formModal} user={editingUser} />
    </div>
  );
};

export default AllUsersPage;
