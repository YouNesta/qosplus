import {Component} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    RouterLink
    } from 'angular2/router';

import {enableProdMode} from 'angular2/core';
enableProdMode();

import {HeaderComponent} from "./Layouts/header.component";
import {FooterComponent} from "./Layouts/footer.component";
import {UserComponent}    from './User/user.component'
import {HomeComponent}    from './Home/home.component'
import {UserFactory} from "./User/user.factory";
import {RegEx} from "./lib/regex";
import {RouteAuth} from "./Config/route-auth";
import {AdminComponent} from "./Admin/admin.component";
import {AdminFactory} from "./Admin/admin.factory";


@Component({
    selector: "app",
    template:   "<header></header>" +
                "<router-outlet></router-outlet>" +
                "<footer>{{title}}</footer>",

    directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent]
})

@RouteConfig([
    { path: "/...", as: "Home", component: HomeComponent, useAsDefault: true },
    { path: "/users/...", as: "Users", component: UserComponent },
    { path: "/admin/...", as: "Admin", component: AdminComponent}
])



export class App {
    title = "penis";
    constructor(){

    }

}

bootstrap(App, [ROUTER_PROVIDERS, HTTP_PROVIDERS, UserFactory, RegEx, RouteAuth, AdminFactory]);
