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
import 'rxjs/Rx';



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
    constructor(public http: Http) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('/api/v1/users/subscribe', this.title, {
                headers: headers
            })
            .subscribe(
                data => {
                    console.log(data);
                },
                err => console.log(err.json().message),
                () => console.log('Authentication Complete')
            );


    }
}

bootstrap(App, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);
