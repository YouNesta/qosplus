import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {ProductAddComponent} from "./product-add.component";
import {ProductListComponent} from "./product-list.component";
import {ProductAddCartComponent} from "./product-add-cart.component";



@Component({
    template:
        "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/list", name: "List", component: ProductListComponent},
    { path: "/add", name: "Add", component: ProductAddComponent},
    { path: "/addCart", name: "AddCart", component: ProductAddCartComponent}
])



export class ProductComponent {

}

