import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "src/shared/models/user.model";
import { LocalstorageService } from "./localstorage.service";

@Injectable({
    providedIn: 'root'
})
class UserService implements OnInit {
    currentUser!: User;

    constructor(private http: HttpClient, private localStorageService: LocalstorageService) {
        if (this.localStorageService.getStorageItem("webshop_user_id")) {
            let _id = parseInt(this.localStorageService.getStorageItem("webshop_user_id")!);

            this.initializeUser(_id)
        }
    }

    ngOnInit(): void {

    }

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

    getCurrentUser() {
        return this.currentUser;
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.BASE_API_URL}` + 'user')
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.BASE_API_URL}` + 'user/' + `${id}`);
    }

    isAdmin(): boolean {
        if (this.getCurrentUser() != undefined) {
            return this.getCurrentUser()!.role == "ADMIN"
        }

        return false;
    }
}

export default UserService;

