import {Component} from 'angular2/core';
import {UserService}    from './user.service'

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';



@Component({
    template: "<h1>LOLOLOL</h1>" +
    "<router-outlet></router-outlet>" +
    "<a [routerLink]=\"['User', 'Default']\">Crisis Center</a>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", name: "Default", component: UserService}
])



export class UserComponent { }

