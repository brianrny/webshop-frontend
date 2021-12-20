import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "src/shared/models/user.model";
import { LocalstorageService } from "./localstorage.service";

@Injectable({
    providedIn: "root"
})
class UserService {
    currentUser!: User;

    constructor(private http: HttpClient, private localStorageService: LocalstorageService) { }

    initializeUser(userid: number): void {
        this.getUserById(userid).subscribe(user => {
            this.setCurrentUser(user)
        })
    }

    uninitializeUser() {
        this.setCurrentUser({} as User);
    }

    setCurrentUser(assignedUser: User): void {
        this.currentUser = assignedUser;
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.BASE_API_URL}` + 'user')
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.BASE_API_URL}` + 'user/' + `${id}`);
    }

    getCurrentUser(): User {
        return this.currentUser;
    }

    isAdmin(): boolean {
        if (this.getCurrentUser() != undefined) {
            return this.getCurrentUser()!.role == "ADMIN"
        }

        return false;
    }
}

export default UserService;

