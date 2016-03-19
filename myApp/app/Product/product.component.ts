import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {ProductAddComponent} from "./product-add.component";



@Component({
    template:
        "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/add", name: "Add", component: ProductAddComponent},
])



export class ProductComponent {

}

