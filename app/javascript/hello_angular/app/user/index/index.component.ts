import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

import templateString from "./index.component.html";
import { UserService } from "../user.service";
import { User } from "../user.class";

@Component({
	selector: "users",
	template: templateString,
})
export class UserIndexComponent implements OnInit {
	users: User[];
	modalRef: BsModalRef;
	userForm: FormGroup;
	isNew: Boolean;

	constructor(
		public fb: FormBuilder,
		private userService: UserService,
		private modalService: BsModalService
	) {}

	public newUser(template: TemplateRef<any>) {
		this.reset();
		this.modalRef = this.modalService.show(template);
	}

	public createUser() {
		this.userService.create(this.userForm.value).subscribe(() => {
			console.log("User created!");
			this.reset();

			this.modalRef.hide();
		});
	}

	public editUser(user, template: TemplateRef<any>) {
		this.isNew = false;
		this.userForm = this.fb.group({
			id: [user.id],
			name: [user.name],
			age: [user.age],
			address: [user.address],
		});

		this.modalRef = this.modalService.show(template);
	}

	public updateUser() {
		const { id } = this.userForm.value;
		this.userService.update(id, this.userForm.value).subscribe(() => {
			console.log("User updated!");
			this.reset();

			this.modalRef.hide();
		});
	}

	public deleteUser(id) {
		if (confirm("Are you sure?")) {
			this.userService.delete(id).subscribe(() => {
				console.log("User deleted!");
				this.reset();
			});
		}
	}

	ngOnInit() {
		this.reset();
	}

	public reset() {
		this.isNew = true;
		this.userService.getUsers().subscribe((users) => {
			this.users = users;
		});

		this.userForm = this.fb.group({
			id: [""],
			name: [""],
			age: [""],
			address: [""],
		});
	}
}
