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
import {ProductFactory} from "../Product/product.factory";
import {UserCartComponent} from "./user-cart.component";
import {UserCommandComponent} from "./user-command.component";
import {UserFactureComponent} from "./user-facture.component";



@Component({
    providers: [RegEx, AlertService, ProductFactory],
    template:
    "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/", name: "Dashboard", component: UserDashboardComponent},
    { path: "/shop", name: "Shop", component: UserProductsListComponent},
    { path: "/cart", name: "Cart", component: UserCartComponent},
    { path: "/commands", name: "Command", component: UserCommandComponent},
    { path: "/payments", name: "Payment", component: UserFactureComponent},
    { path: "/product/:id", name: "Product", component: UserProductComponent}
])



export class UserComponent {

}

