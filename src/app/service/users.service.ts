import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Users} from '../model/Users';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {Password} from '../model/Password';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  changePassword(data: Password, idUser): Observable<any> {
    console.log(this.httpService.getHttp());
    return this.http.put(API_URL + '/home/user/changePassword/' + idUser, data, this.httpService.getHttp());
  }

  getUserById(id: string): Observable<Users> {
    return this.http.get<Users>(API_URL + '/user/' + id, this.httpService.getHttp());
  }

  updateUser(user: Users): Observable<any> {
    return this.http.post(API_URL + '/user/changeinfo', user , this.httpService.getHttp());
  }
}
