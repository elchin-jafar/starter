import type { AllUsersModel, UserModel } from '../models/get_all_users.model';
import type { AddUserReqDTO } from '../req_dto/add_user.dto';
import type { UpdateUserReqDTO } from '../req_dto/update_user.dto';

export type UserRepositoryType = {
  getAllUsers(): Promise<AllUsersModel>;
  getByIdUser(id: number): Promise<UserModel>;
  addUser(data: AddUserReqDTO): Promise<unknown>;
  updateUser(id: number, data: UpdateUserReqDTO): Promise<unknown>;
  deleteUser(id: number): Promise<unknown>;
};
