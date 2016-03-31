import {Component, OnInit} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';


import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    RouterLink, Router} from 'angular2/router';

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
import {PageNotFoundComponent} from "./Page/page-not-found.component";
import {provide} from "angular2/core";
import {APP_BASE_HREF} from "angular2/router";
import {User} from "./User/user";
import {Admin} from "./Admin/admin";
import {FormValidator} from "./Config/form-validator";



@Component({
    selector: "app",
    template:   "<header [connected]='service.isConnected()' [admin]='service.isAdmin()'></header>" +
                "<div class='content'><router-outlet></router-outlet></div>" +
                "<footer>{{title}}</footer>",

    directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent]
})

@RouteConfig([
    { path: "/...", as: "Home", component: HomeComponent},
    { path: "/user/...", as: "User", component: UserComponent },
    { path: "/admin/...", as: "Admin", component: AdminComponent},
    { path: '/404', name: '404', component: PageNotFoundComponent },
    { path: '/*path', redirectTo:['404'] }
])



export class App {
    title = "penis";

    constructor(public service: UserFactory){
        if(this.service.isConnected() && tokenNotExpired('token')){
            this.service.user()
        }
    }



}

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    UserFactory,
    RegEx,
    RouteAuth,
    AdminFactory,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({headerName:'Authorization',    tokenName: "token",    tokenGetter: function(){
                return localStorage.getItem("token")
            }, noJwtError: true}), http);
        },
        deps: [Http]
    }),
    provide(APP_BASE_HREF, {useValue:'/'}),
    FormValidator
]);

