import {
  Button,
  Pagination,
  Spinner,
  Table,
  Typography,
  useOverlayState,
} from '@heroui/react';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  DEFAULT_USERS_PAGE_SIZE,
  useGetAllUsersApi,
} from '../../../app/modules/users/api/getAllUsers.api';
import type { UserModel } from '../../../app/modules/users/models/get_all_users.model';
import DeleteUserCell from '../../features/users/DeleteUserCell';
import GoToUserCell from '../../features/users/GoToUser';
import UserFormModal from '../../features/users/UserFormModal';

const PAGE_SIZE = DEFAULT_USERS_PAGE_SIZE;

const getPageItems = (
  current: number,
  total: number,
): Array<number | 'ellipsis'> => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: Array<number | 'ellipsis'> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push('ellipsis');
  for (let p = start; p <= end; p += 1) items.push(p);
  if (end < total - 1) items.push('ellipsis');

  items.push(total);
  return items;
};

const AllUsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get('page'));
  const page =
    Number.isFinite(pageParam) && pageParam >= 1 ? Math.floor(pageParam) : 1;

  const { data, isLoading, isError, isPlaceholderData } = useGetAllUsersApi({
    page,
    pageSize: PAGE_SIZE,
  });

  const formModal = useOverlayState();
  const [editingUser, setEditingUser] = useState<UserModel | undefined>(
    undefined,
  );

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / PAGE_SIZE))
    : 1;

  const goToPage = (next: number) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set('page', String(next));
        return params;
      },
      { replace: true },
    );
  };

  useEffect(() => {
    if (data && page > totalPages) goToPage(totalPages);
  }, [data, page, totalPages]);

  const openAdd = () => {
    setEditingUser(undefined);
    formModal.open();
  };

  const openEdit = (user: UserModel) => {
    setEditingUser(user);
    formModal.open();
  };

  if (isError) throw new Error('Something went wrong');

  if (isLoading) return <Spinner />;

  if (!data) return null;

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
            <Table.Content
              aria-label="users"
              className={isPlaceholderData ? 'opacity-60' : undefined}
            >
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

        <Pagination className="mt-3 flex flex-col items-center gap-2">
          <Pagination.Summary>
            Page {page} of {totalPages} · {data.total} users
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page <= 1 || isPlaceholderData}
                onPress={() => goToPage(page - 1)}
              >
                <Pagination.PreviousIcon />
                <span>Previous</span>
              </Pagination.Previous>
            </Pagination.Item>

            {getPageItems(page, totalPages).map((item, i) =>
              item === 'ellipsis' ? (
                <Pagination.Item key={`ellipsis-${i}`}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={item}>
                  <Pagination.Link
                    isActive={item === page}
                    isDisabled={isPlaceholderData}
                    onPress={() => goToPage(item)}
                  >
                    {item}
                  </Pagination.Link>
                </Pagination.Item>
              ),
            )}

            <Pagination.Item>
              <Pagination.Next
                isDisabled={page >= totalPages || isPlaceholderData}
                onPress={() => goToPage(page + 1)}
              >
                <span>Next</span>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>

      <UserFormModal state={formModal} user={editingUser} />
    </div>
  );
};

export default AllUsersPage;
