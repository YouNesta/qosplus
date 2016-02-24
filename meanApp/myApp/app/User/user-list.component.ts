import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {UsersService} from "./user.service";



@Component({
    template: "<h1>LOLOLOL</h1>" +
    "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", name: "Login", component: UsersService}
])



export class UserListComponent {

}

