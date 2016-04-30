import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {ProductAddComponent} from "./product-add.component";
import {ProductListComponent} from "./product-list.component";

import {ProductPriceComponent} from "./product-price.component";
import {ProductAddCartComponent} from "./product-add-cart.component";
import {ProductCartComponent} from "./product-cart.component";
import {ProductCommandComponent} from "./product-command-list.component";




@Component({
    template:
        "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/list", name: "List", component: ProductListComponent},
    { path: "/add", name: "Add", component: ProductAddComponent},
    { path: "/price", name: "Price", component: ProductPriceComponent},
    { path: "/cart", name: "Cart", component: ProductCartComponent},
    { path: "/addCart", name: "AddCart", component: ProductAddCartComponent},
    { path: "/command", name: "Command", component: ProductCommandComponent}
])



export class ProductComponent {

}

