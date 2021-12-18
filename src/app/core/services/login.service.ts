import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logged_in!: boolean;
  is_redirected!: boolean;

  constructor(private http: HttpClient) {
    this.logged_in = false;
    this.is_redirected = false;
  }

  login(data: any) {
    let credentials = { username: data.value.username, password: data.value.password };
    return this.http.post(`${environment.BASE_API_URL}` + 'login', credentials)
  }

  isLoggedIn() {
    return this.logged_in;
  }

  setIsLoggedIn(value: boolean) {
    this.logged_in = value;
  }

  isRedirected() {
    return this.is_redirected;
  }

  setIsRedirected(value: boolean) {
    this.is_redirected = value;
  }
}
