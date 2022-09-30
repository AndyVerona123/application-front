import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {Localtion} from '../model/localtion';

const urlBase = environment.url;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  public getLocationForUser(idUser: number): Observable<any> {
    return this.http.get(urlBase.concat(`/location/${idUser}`), {responseType: 'json'});
  }

  public createLocation(location: Localtion): Observable<any> {
    return this.http.post(urlBase.concat('/location'), location, httpOptions);
  }
}
