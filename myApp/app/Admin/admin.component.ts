import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {AdminSubscribeComponent} from "./admin-subscribe.component";
import {AdminDashBoardComponent} from "./admin-dashboard.component";
import {AdminValidationComponent} from "./admin-validation.component";
import {ProductComponent} from "../Product/product.component";
import {RegEx} from "../lib/regex";
import {AdminFactory} from "./admin.factory";
import {AlertService} from "../Tools/alert";
import {FormValidator} from "../Config/form-validator";
import {ProductFactory} from "../Product/product.factory";


@Component({
    template:
    "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES],
    providers: [RegEx, AdminFactory, AlertService, FormValidator, ProductFactory]
})

@RouteConfig([
    { path: "/subscribe", name: "Subscribe", component: AdminSubscribeComponent},
    { path: "/", name: "Dashboard", component: AdminDashBoardComponent},
    { path: "/validation", as: "Validation", component: AdminValidationComponent},
    { path: "/product/...", as: "Product", component: ProductComponent}


])



export class AdminComponent {
}

