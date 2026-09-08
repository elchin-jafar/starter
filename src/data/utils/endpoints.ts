export const endpoints = {
  users: {
    getAllUsers: () => '/users',
    getByIdUser: (id: number) => `/users/${id}`,
    addUser: () => '/users/add',
    updateUser: (id: number) => `/users/${id}`,
    deleteUser: (id: number) => `/users/${id}`,
  },
};
