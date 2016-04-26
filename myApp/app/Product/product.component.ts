import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {ProductAddComponent} from "./product-add.component";
import {ProductListComponent} from "./product-list.component";

import {ProductPriceComponent} from "./product-price.component";



@Component({
    template:
        "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/list", name: "List", component: ProductListComponent},
    { path: "/add", name: "Add", component: ProductAddComponent},
    { path: "/price", name: "Price", component: ProductPriceComponent}
])



export class ProductComponent {

}

