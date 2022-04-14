import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {LikeSongService} from '../../../service/likeSong.service';
// @ts-ignore
import {LikeSong} from '../../../model/LikeSong';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
import {Playlist} from '../../../model/Playlist';
import {UsersService} from '../../../service/users.service';
import {Users} from '../../../model/Users';
declare var Swal: any;

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.scss']
})
export class AllSongsComponent implements OnInit {

  songList: Song[];
  likeSongs: LikeSong[] = [];
  playlists: Playlist[];
  userId: number;
  status: boolean;
  song: Song;
  user: Users;
  p: number;

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private likeSongService: LikeSongService,
              private userService: UsersService,
              private httpClient: HttpService) {
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
      // tslint:disable-next-line:no-shadowed-variable
      this.playlistService.getPlaylistByUser(this.userId).subscribe(res => {
        this.playlists = res;
      });
      this.userId = Number(this.httpClient.getID());
      this.likeSongService.getAllLikeSong().subscribe(response => {
        this.likeSongs = response;
      });
      this.playlistService.getPlaylistByUser(this.userId).subscribe(playlist => {
        this.playlists = playlist;
      });
    });
  }

  // tslint:disable-next-line:typedef
  likeSong(song, like) {
    if (like.status) {
      song.countLike--;
      like.status = false;
    } else {
      song.countLike++;
      like.status = true;
    }
    this.likeSongService.updateLikeSong(like).subscribe(() => {
      this.songService.updateSong(song).subscribe(() => {
        this.songService.getAllSongs().subscribe(res => {
          this.songList = res;
        });
      });
    });
  }

  // tslint:disable-next-line:typedef
  addSongInPlaylist(listID, songId) {
    this.playlistService.updateSongOfPlaylist(listID, songId).subscribe(res => {
      this.playlistService.getPlaylistByUser(this.userId).subscribe(data => {
        this.playlists = data;
      });
      Swal.fire({
        icon: 'success',
        title: res.message,
        showConfirmButton: true,
        timer: 3000
      });
    });
  }
}
