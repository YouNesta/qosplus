import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {UserLoginComponent} from "./user-login.component";
import {UserSubscribeComponent} from "./user-subscribe.component";
import {UserDashboardComponent} from "./user-dashboard.component";
import {UserProfileComponent} from "./user-profile.component";
import {UserProductsListComponent} from "./user-products-list.component";
import {UserProductComponent} from "./user-product-display.component";



@Component({
    template:
    "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", name: "Dashboard", component: UserDashboardComponent},
    { path: "/shop", name: "Shop", component: UserProductsListComponent},
    { path: "/product/:id", name: "Product", component: UserProductComponent}
])



export class UserComponent {

}

