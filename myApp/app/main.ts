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
import {UserComponent}    from './User/user.component'
import {HomeComponent}    from './Home/home.component'
import {UserFactory} from "./User/user.factory";


@Component({
    selector: "app",
    template:   "<header></header>" +
                "<router-outlet></router-outlet>" +
                "<footer>{{title}}</footer>",

    directives: [ROUTER_DIRECTIVES, HeaderComponent]
})

@RouteConfig([
    { path: "/", as: "Home", component: HomeComponent },
    { path: "/users/...", as: "Users", component: UserComponent }
])



export class App {
    title:string;
    constructor(){

    }
}

bootstrap(App, [ROUTER_PROVIDERS, HTTP_PROVIDERS, UserFactory]);
