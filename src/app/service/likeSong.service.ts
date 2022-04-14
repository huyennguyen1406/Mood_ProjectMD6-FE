import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LikeSong} from '../model/LikeSong';
import {HttpService} from './http.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikeSongService {

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getAllLikeSong(): Observable<any> {
    return this.http.get<any>(API_URL + '/likeSong', this.httpService.getHttp());
  }

  updateLikeSong(likeSong: LikeSong): Observable<any> {
    return this.http.post(API_URL + '/likeSong', likeSong, this.httpService.getHttp());
  }
}
