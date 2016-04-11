import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {AdminSubscribeComponent} from "./admin-subscribe.component";
import {AdminDashBoardComponent} from "./admin-dashboard.component";
import {AdminValidationComponent} from "./admin-validation.component";
import {Input} from "angular2/core";
import {ProductComponent} from "../Product/product.component";


@Component({
    template:
    "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/subscribe", name: "Subscribe", component: AdminSubscribeComponent},
    { path: "/", name: "Dashboard", component: AdminDashBoardComponent},
    { path: "/validation", as: "Validation", component: AdminValidationComponent},
    { path: "/product/...", as: "Product", component: ProductComponent}


])



export class AdminComponent {
}

