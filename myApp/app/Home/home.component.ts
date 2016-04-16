import {Component, OnInit} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {HomeHomepageComponent} from "./home-homepage.component";
import {HomeAboutComponent} from "./home-about.component";
import {HomeProductsComponent} from "./home-products.component";
import {HomeContactComponent} from "./home-contact.component";
import {UserFactory} from "../User/user.factory";
import {tokenNotExpired} from "angular2-jwt";
import {RouteAuth} from "../Config/route-auth";

@Component({
    template:
        "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", name: "Homepage", component: HomeHomepageComponent},
    { path: "/about", name: "About", component: HomeAboutComponent},
    { path: "/products", name: "Products", component: HomeProductsComponent},
    { path: "/engagements", name: "Contact", component: HomeContactComponent}
])

export class HomeComponent  implements OnInit{

constructor(public routeAuth: RouteAuth, public service : UserFactory){

}

ngOnInit(){
    if(this.service.isConnected() && tokenNotExpired('token')){
        this.routeAuth.redirect();
    }
}
}

