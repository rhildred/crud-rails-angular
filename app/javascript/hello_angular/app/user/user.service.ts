import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { User } from "./user.class";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(private http: HttpClient) {}

	httpOptions = {
		headers: new HttpHeaders({
			"Content-Type": "application/json",
		}),
	};

	getUsers(): Observable<User[]> {
		return this.http.get("/users.json").pipe(
			map((users: User[]) =>
				users.map((user) => {
					return new User(user.id, user.name, user.age, user.address);
				})
			)
		);
	}

	create(user): Observable<User> {
		return this.http.post<User>(
			"/users.json",
			JSON.stringify(user),
			this.httpOptions
		);
	}

	update(id, user): Observable<User> {
		return this.http.put<User>(
			"/users/" + id + ".json",
			JSON.stringify(user),
			this.httpOptions
		);
	}

	delete(id) {
		return this.http.delete<User>("/users/" + id + ".json", this.httpOptions);
	}
}
