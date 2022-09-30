import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() {
  }

  setValue(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue(key: string) {
    //console.log(JSON.parse(localStorage.getItem(key)));
    return JSON.parse(localStorage.getItem(key));
  }

  clearAll() {
    localStorage.clear();
  }
}
