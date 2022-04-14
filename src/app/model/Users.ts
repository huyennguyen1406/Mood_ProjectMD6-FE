import {Role} from './Role';

export interface Users {
  id?: number;
  name?: string;
  address?: string;
  phone?: string;
  avatarUrl?: string;
  username?: string;
  password?: string;
  email?: string;
  role?: Role[];
}
