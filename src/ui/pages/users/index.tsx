import {
  DEFAULT_USERS_PAGE_SIZE,
  useGetAllUsersApi,
} from "@/app/modules/users/api/getAllUsers.api";
import { useSearchUsersApi } from "@/app/modules/users/api/searchUsers.api";
import type { UserModel } from "@/app/modules/users/models/get_all_users.model";
import DeleteUserCell from "@/ui/features/users/DeleteUserCell";
import GoToUserCell from "@/ui/features/users/GoToUser";
import UserFormModal from "@/ui/features/users/UserFormModal";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Pagination,
  SearchField,
  Spinner,
  Table,
  Typography,
  useOverlayState,
} from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const PAGE_SIZE = DEFAULT_USERS_PAGE_SIZE;
const SEARCH_DEBOUNCE_MS = 400;

const getPageItems = (
  current: number,
  total: number,
): Array<number | "ellipsis"> => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis");
  for (let p = start; p <= end; p += 1) items.push(p);
  if (end < total - 1) items.push("ellipsis");

  items.push(total);
  return items;
};

const AllUsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const isSearching = q.trim().length > 0;

  const pageParam = Number(searchParams.get("page"));
  const page =
    Number.isFinite(pageParam) && pageParam >= 1 ? Math.floor(pageParam) : 1;

  const [term, setTerm] = useState(q);
  const [lastSyncedQ, setLastSyncedQ] = useState(q);
  if (q !== lastSyncedQ) {
    setLastSyncedQ(q);
    setTerm(q);
  }

  useEffect(() => {
    if (term.trim() === q) return;

    const id = setTimeout(() => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          const trimmed = term.trim();
          if (trimmed) params.set("q", trimmed);
          else params.delete("q");
          params.delete("page");
          return params;
        },
        { replace: true },
      );
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(id);
  }, [term, q, setSearchParams]);

  const listQuery = useGetAllUsersApi({
    page,
    pageSize: PAGE_SIZE,
    enabled: !isSearching,
  });
  const searchQuery = useSearchUsersApi({ q, page, pageSize: PAGE_SIZE });

  const { data, isLoading, isError, isPlaceholderData } = isSearching
    ? searchQuery
    : listQuery;

  const formModal = useOverlayState();
  const [editingUser, setEditingUser] = useState<UserModel | undefined>(
    undefined,
  );

  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1;

  const goToPage = useCallback(
    (next: number) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.set("page", String(next));
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (data && page > totalPages) goToPage(totalPages);
  }, [data, page, totalPages, goToPage]);

  const openAdd = () => {
    setEditingUser(undefined);
    formModal.open();
  };

  const openEdit = (user: UserModel) => {
    setEditingUser(user);
    formModal.open();
  };

  if (isError) throw new Error("Something went wrong");

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

      <div className="w-3xl mt-3">
        <SearchField
          aria-label="Search users"
          value={term}
          onChange={setTerm}
          className="w-64"
        >
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search users…" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

      <div className="w-3xl mt-2">
        {data.users.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center text-sm">
            {isSearching ? `No users match “${q}”.` : "No users yet."}
          </div>
        ) : (
          <Table>
            <Table.ScrollContainer className="max-h-[70vh] overflow-y-auto">
              <Table.Content
                aria-label="users"
                className={isPlaceholderData ? "opacity-60" : undefined}
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
        )}

        {totalPages > 1 && (
          <Pagination className="mt-3 flex flex-col items-center gap-2">
            <Pagination.Summary>
              Page {page} of {totalPages} · {data.total}{" "}
              {isSearching ? "matches" : "users"}
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
                item === "ellipsis" ? (
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
        )}
      </div>

      <UserFormModal state={formModal} user={editingUser} />
    </div>
  );
};

export default AllUsersPage;
