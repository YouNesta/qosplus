import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {UserLoginComponent} from "./user-login.component";
import {UserSubscribeComponent} from "./user-subscribe.component";
import {UserDashboardComponent} from "./user-dashboard.component";



@Component({
    template:
    "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", name: "Dashboard", component: UserDashboardComponent}
])



export class UserComponent {

}

