import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let path = route.url[0].path;

        if (this.authService.getAuthenticated() && path == "register") {
            this.router.navigate(['/']);
            return false;
        }

        if (this.authService.getAuthenticated() && path == "login") {
            this.router.navigate(['/'])
            return false;
        }

        if (!this.authService.getAuthenticated() && path == "orders") {
            this.router.navigate(['/'])
            return false;
        }

        if (!this.authService.getAuthenticated() && path == "logout") {
            this.router.navigate(['/login']);
            return false;
        }

        if (!this.authService.getAuthenticated() && path == "order") {
            this.router.navigate(['/login']);

            this.authService.setIsRedirected(true)
            return false;
        }

        if (!this.authService.isAdmin() && path == "dashboard") {
            console.log(this.authService.isAdmin());


            this.router.navigate(['/'])
            return false;
        }

        return true;
    }


}

export default AuthGuard;