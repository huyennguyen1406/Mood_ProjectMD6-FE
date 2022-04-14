import {Component, OnInit} from '@angular/core';
import {Song} from '../../../model/Song';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {LikeSong} from '../../../model/LikeSong';
import {Playlist} from '../../../model/Playlist';
import {Commentsong} from '../../../model/Commentsong';
import {Users} from '../../../model/Users';
import {UsersService} from '../../../service/users.service';
import {LikeSongService} from '../../../service/likeSong.service';
import {CommentsongService} from '../../../service/commentsong.service';
import {HttpService} from '../../../service/http.service';
import {PlaylistService} from '../../../service/playlist.service';
declare var Amplitude: any;

@Component({
  selector: 'app-play-song',
  templateUrl: './play-song.component.html',
  styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {
  songList: Song[];
  likeSongs: LikeSong[];
  commentsong: Commentsong[];
  id: number;
  userId: number;
  song: Song;
  user: Users;
  p: number;
  page: number;

  constructor(private songService: SongService,
              private playlistService: PlaylistService,
              private router: ActivatedRoute,
              private userService: UsersService,
              private likeSongService: LikeSongService,
              private commentsongService: CommentsongService,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.userId = Number(this.httpService.getID());
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.commentsongService.getCommentBySong(this.id).subscribe(res => {
      this.commentsong = res;
    });
    this.songService.getSongByLike().subscribe(res => {
      this.songList = res;
    });
    this.likeSongService.getAllLikeSong().subscribe(res => {
      this.likeSongs = res;
    });
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
    });
    this.songService.getSongById(this.id).subscribe(res => {
      this.song = res;
      Amplitude.init({
        songs: [
          {
            url: this.song.fileUrl,
            cover_art_url: this.song.avatarUrl
          }
        ],
      });
    });
  }

  // tslint:disable-next-line:typedef
  changeSong(data) {
    this.commentsongService.getCommentBySong(data).subscribe(res => {
      this.commentsong = res;
    });
    this.songService.getSongById(data).subscribe(res => {
      this.song = res;
      Amplitude.init({
        songs: [
          {
            url: this.song.fileUrl,
            cover_art_url: this.song.avatarUrl
          }
        ],
      });
    });
  }
}
