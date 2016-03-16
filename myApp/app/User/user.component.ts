import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {UserLoginComponent} from "./user-login.component";
import {UserSubscribeComponent} from "./user-subscribe.component";
import {UserDashBoardComponent} from "./user-dashboard.component";



@Component({
    template:
    "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/login", name: "Login", component: UserLoginComponent},
    { path: "/subscribe", name: "Subscribe", component: UserSubscribeComponent},
    { path: "/", name: "Dashboard", component: UserDashBoardComponent}
])



export class UserComponent {

}

