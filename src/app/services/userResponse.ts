import { User } from './user';

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}
