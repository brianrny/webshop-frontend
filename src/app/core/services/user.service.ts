import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "src/shared/models/user.model";
import { LocalstorageService } from "./localstorage.service";

@Injectable({
    providedIn: 'root'
})
class UserService {
    constructor(private http: HttpClient) {
    }

    saveUser(assignedUser: User): Observable<User> {
        return this.http.post<User>(`${environment.BASE_API_URL}` + '/user/new', assignedUser);
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.BASE_API_URL}` + '/user')
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.BASE_API_URL}` + '/user/' + `${id}`);
    }

    editUser(id: number, assignedUser: User): Observable<User> {
        return this.http.put<User>(`${environment.BASE_API_URL}` + '/user/' + id, assignedUser);
    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete<User>(`${environment.BASE_API_URL}` + '/user/' + id);
    }
}

export default UserService;

