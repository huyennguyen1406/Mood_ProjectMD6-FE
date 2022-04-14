import {User} from './User';
import {Singers} from './Singers';
import {Playlist} from './Playlist';
import {Author} from "./Author";
import {Category} from "./Category";
import {Tag} from "./Tag";

export interface Song {
  idSong?: number;
  nameSong?: string;
  descriptionSong?: string;
  mp3UrlSong?: string;
  avatarUrlSong?: string;
  author?: Author;
  user?: User;

  category?:Category;
  numberOfViewSong?: number;
  dateCreateSong?: string;
  playlists?: Playlist[];
  tags?: Tag[];

}
