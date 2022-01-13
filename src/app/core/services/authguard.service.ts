import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import UserService from "./user.service";


@Injectable({
    providedIn: 'root'
})
class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let path = route.url[0].path;

        console.log(path)

        if (this.loginService.getAuthenticated() == false && path == "logout") {
            this.router.navigate(['/login']);
            return false;
        }

        if (this.loginService.getAuthenticated() && path == "register") {
            this.router.navigate(['/']);
            return false;
        }

        if (!this.userService.isAdmin() && path == "dashboard") {
            this.router.navigate(['/'])
            return false;
        }

        return true;
    }


}

export default AuthGuard;