import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Song} from '../model/Song';
import {HttpService} from './http.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) {}

  // Lấy toàn bộ bài hát
  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/song');
  }

  getAllSongsNew(): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/song/newest');
  }

  getAllSongsLikeMost(): Observable<Song[]> {
    return this.http.get<Song[]> (API_URL + '/home/song/like-most')
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(API_URL + '/home/song/' + id);
  }

  getSongByUser(userid: number): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/user/song/' + userid, this.httpService.getHttp());
  }

  getSongBySinger(singerid: number): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/singer/' + singerid);
  }

  getSongByName(search: string): Observable<Song[]> {
    let params = new HttpParams().set('search', search);
    return this.http.get<Song[]>(API_URL + '/home/song/search' , {params});
  }

  getSongByLike(): Observable<Song[]> {
    return this.http.get<Song[]>(API_URL + '/home/song/like-most');
  }

  createSong(song: Song): Observable<any> {
    return this.http.post(API_URL + '/song', song, this.httpService.getHttp());
  }

  updateSong(song: Song): Observable<any> {
    return this.http.put(API_URL + '/song', song, this.httpService.getHttp());
  }

  deleteSong(id: number): Observable<any> {
    return this.http.delete(API_URL + '/song/' + id, this.httpService.getHttp());
  }
}
