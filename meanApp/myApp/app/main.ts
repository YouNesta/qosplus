import {Component} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser'
import {UserComponent}    from './User/user.component'
import {UserService}    from './User/user.service'

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    } from 'angular2/router';



@Component({
    selector: "my-app",
    template: "<h1>LOLOLOL</h1>" +
    "<router-outlet></router-outlet>" +
    "<a [routerLink]=\"['User', 'Default']\">Crisis Center</a>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", as: "Home", component: UserService },
    { path: "/user/...", as: "User", component: UserComponent }
])



export class App { }

bootstrap(App, [ROUTER_PROVIDERS]);
