import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {UserDashboardComponent} from "./user-dashboard.component";
import {UserProductsListComponent} from "./Product/products-list.component";
import {UserProductComponent} from "./user-product-display.component";
import {RegEx} from "../lib/regex";
import {AlertService} from "../Tools/alert";
import {ProductCartComponent} from "../Product/product-cart.component";
import {ProductFactory} from "../Product/product.factory";



@Component({
    providers: [RegEx, AlertService, ProductFactory],
    template:
    "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", name: "Dashboard", component: UserDashboardComponent},
    { path: "/shop", name: "Shop", component: UserProductsListComponent},
    { path: "/cart", name: "Cart", component: ProductCartComponent},
    { path: "/product/:id", name: "Product", component: UserProductComponent}
])



export class UserComponent {

}

