import { addUserService } from '../services/add_user.service';
import { deleteUserService } from '../services/delete_user.service';
import { getAllUsersService } from '../services/get_all_users.service';
import { getByIdUserService } from '../services/get_by_id_user.service';
import { updateUserService } from '../services/update_user.service';
import type { UserRepositoryType } from './users.repository.type';

export const UserRepository: UserRepositoryType = {
  async getAllUsers() {
    return await getAllUsersService();
  },
  async getByIdUser(id) {
    return await getByIdUserService(id);
  },
  async addUser(data) {
    return await addUserService({ data });
  },
  async updateUser(id, data) {
    return await updateUserService(id, data);
  },
  async deleteUser(id) {
    return await deleteUserService({ id });
  },
};
