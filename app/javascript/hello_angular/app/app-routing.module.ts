import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { UserIndexComponent } from "./user/index/index.component";

const appRoutes: Routes = [
	{ path: "users", component: UserIndexComponent },
	{ path: "", redirectTo: "/users", pathMatch: "full" },
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, { scrollPositionRestoration: "enabled" }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
