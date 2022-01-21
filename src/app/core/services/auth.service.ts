import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/shared/models/user.model';
import Utils from '../utils/utils';
import { LocalstorageService } from './localstorage.service';
import UserService from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: User;
  userFound!: boolean;

  isLoaded: boolean;

  authenticated!: boolean;
  is_redirected!: boolean;

  constructor(private http: HttpClient, private localStorageService: LocalstorageService, private router: Router, private userService: UserService) {
    this.is_redirected = false;
    this.isLoaded = false;


    if (this.localStorageService.getStorageItem("webshop_stored_token") != null) {
      this.authenticated = true;

      this.verifyTokenExpiration();

    } else {
      this.authenticated = false;
    }

    if (!this.localStorageService.getStorageItem("webshop_user_id")) return

    let _id = parseInt(this.localStorageService.getStorageItem("webshop_user_id")!);

    this.userService.getUserById(_id)
      .subscribe(
        user => {
          if (this.localStorageService.getStorageItem("webshop_user_role") != null) {
            if (user.role !== this.localStorageService.getStorageItem("webshop_user_role")) {
              this.destroySession()
            }
          }

          this.checkSessionUser(_id);
          this.setCurrentUser(user);

          this.isLoaded = true;
        },
        err => {
          console.error(err);
        })
  }

  login(credentials: { username: string, password: string }) {
    return this.http.post(`${environment.BASE_API_URL}` + '/login', credentials)
  }

  logout() {
    this.destroySession();

    setTimeout(() => this.router.navigate(['/logout']))
  }

  register(data: any) {
    return this.http.post(`${environment.BASE_API_URL}` + '/register', { ...data.value, role: "USER" });
  }

  verifyTokenExpiration() {
    this.checkToken(this.localStorageService.getStorageItem("webshop_stored_token")!.toString())
  }

  checkToken(token: string) {
    try {
      const expiredTime = (JSON.parse(atob(token.split('.')[1]))).exp
      const currentTime = Math.floor(Date.now() / 1000);

      if (expiredTime < currentTime) {
        this.destroySession()
      }
    } catch (err) {

      this.destroySession()
      this.router.navigate(['/']);
    }
  }

  createSession(data: any) {
    let { jwtToken, userid } = data;

    this.localStorageService.setStorageItem("webshop_stored_token", jwtToken.token);
    this.localStorageService.setStorageItem("webshop_user_id", userid);

    this.userService.getUserById(userid)
      .subscribe(user => {
        this.setCurrentUser(user)
        this.localStorageService.setStorageItem("webshop_user_role", this.currentUser.role)

        this.isLoaded = true;
      })

    this.setAuthenticated(true);

    if (this.getRedirected() == true) {
      setTimeout(() => {
        this.router.navigate(['/order'])
      }, 2500)
    } else {
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 2500)
    }
  }

  destroySession() {
    this.localStorageService.removeStorageItem("webshop_stored_token");
    this.localStorageService.removeStorageItem("webshop_user_id");
    this.localStorageService.removeStorageItem("webshop_user_role");

    this.uninitializeUser()

    this.setAuthenticated(false)
  }

  checkSessionUser(id: number) {
    if (!this.localStorageService.getStorageItem("webshop_stored_token")) return

    const sessionUsername = Utils.getJwtTokenData(JSON.stringify(this.localStorageService.getStorageItem("webshop_stored_token"))).sub;

    this.userService.getUserById(id).subscribe(
      user => {
        if (sessionUsername != user.username) {
          this.logout();
        }
      },
      err => {
        this.logout();
      })
  }

  currentUserNull() {
    return Utils.objectIsEmpty(this.currentUser)
  }

  setCurrentUser(assignedUser: User): void {
    this.currentUser = assignedUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  uninitializeUser() {
    this.setCurrentUser({} as User);
  }

  isAdmin(): boolean {
    return this.localStorageService.getStorageItem("webshop_user_role")! == "ADMIN";
  }

  isAuthenticated() {
    return this.authenticated == true;
  }

  getAuthenticated() {
    return this.authenticated;;
  }

  setAuthenticated(value: boolean) {
    this.authenticated = value;
  }

  getRedirected() {
    return this.is_redirected;
  }

  setIsRedirected(value: boolean) {
    this.is_redirected = value;
  }
}
