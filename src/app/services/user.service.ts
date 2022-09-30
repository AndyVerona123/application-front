import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {environment} from '../../environments/environment';

const urlBase = environment.url;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public createUser(user: User): Observable<any> {
    return this.http.post(urlBase.concat('/users'), user, httpOptions);
  }

  public getUser(email: string, password: string): Observable<any> {
    return this.http.get(urlBase.concat(`/users/login/${email}/${password}`), {responseType: 'json'});
  }

}
