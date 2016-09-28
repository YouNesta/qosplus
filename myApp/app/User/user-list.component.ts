import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {UserFactory} from "./user.factory";
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
@CanActivate(() => tokenNotExpired('token'))


@Component({
    template: "" +
    "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", name: "Login", component: UserFactory}
])




export class UserListComponent {

}

