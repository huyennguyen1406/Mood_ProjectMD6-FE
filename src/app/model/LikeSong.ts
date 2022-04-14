import {Users} from './Users';
import {Song} from './Song';

export interface LikeSong {
  id?: number;
  status?: boolean;
  user?: Users;
  song?: Song;
}
