import {Component, OnInit} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';


import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    RouterLink, Router, Location} from 'angular2/router';

import {enableProdMode} from 'angular2/core';
enableProdMode();

import {HeaderComponent} from "./Layouts/header.component";
import {FooterComponent} from "./Layouts/footer.component";
import {SearchComponent} from "./Tools/search.component";
import {UserComponent}    from './User/user.component'
import {HomeComponent}    from './Home/home.component'
import {UserFactory} from "./User/user.factory";
import {RegEx} from "./lib/regex";
import {RouteAuth} from "./Config/route-auth";
import {AdminComponent} from "./Admin/admin.component";
import {AdminFactory} from "./Admin/admin.factory";
import {ProductFactory} from "./Product/product.factory";
import {PageNotFoundComponent} from "./Page/page-not-found.component";
import {provide} from "angular2/core";
import {APP_BASE_HREF} from "angular2/router";
import {User} from "./User/user";
import {Admin} from "./Admin/admin";
import {FormValidator} from "./Config/form-validator";
import {AlertComponent} from "./Tools/alert.component";
import {AlertService} from "./Tools/alert";
import {Product} from "./Product/product";


@Component({
    selector: "app",
    template:   "<header [connected]='service.isConnected()' [admin]='service.isAdmin()'></header>" +
                "<div class='wrapper {{routeAuth.base}}'><search *ngIf='routeAuth.auth == true'></search><alert></alert><router-outlet></router-outlet></div>" +
                "<footer>{{title}}</footer>",

    directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent, SearchComponent, AlertComponent]
})

@RouteConfig([
    { path: "/...", as: "Home", component: HomeComponent},
    { path: "/user/...", as: "User", component: UserComponent },
    { path: "/admin/...", as: "Admin", component: AdminComponent},
    { path: '/404', name: '404', component: PageNotFoundComponent },
    { path: '/*path', redirectTo:['404'] }
])



export class App  implements OnInit{
    title = "QosPlus";
    user = [];
    routeAuth = {
        base: " ",
        name: " ",
        auth: false
    };

    constructor(private service: UserFactory, private router: Router, private routerAuth: RouteAuth , location: Location){
        this.routeAuth =  this.routerAuth.routeAuth(location.path());


    }
    getName () {
        return "Angular 2";
    }
    ngOnInit(){
        this.router.subscribe((val) => {
            this.routeAuth =  this.routerAuth.routeAuth(val);
        });
    }

}

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    UserFactory,
    RegEx,
    RouteAuth,
    AdminFactory,
    ProductFactory,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({headerName:'Authorization',    tokenName: "token",    tokenGetter: function(){
                return localStorage.getItem("token")
            }, noJwtError: true}), http);
        },
        deps: [Http]
    }),
    provide(APP_BASE_HREF, {useValue:'/'}),
    FormValidator,
    AlertComponent,
    AlertService
]);

