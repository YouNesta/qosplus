import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "../Product/product.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import {Product} from "../Product/product";


@Component({
    providers: [],
    templateUrl: "app/User/user-products-list.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class UserProductsListComponent {
    products: Object;

    constructor(public service: ProductFactory, public router: Router){
        this.service.getProduct()
            .subscribe(
                response => {
                    if(response.success){
                        this.products = response.data;
                        console.log(this.products)
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('get product list Complete')
            );
    }

    onSelect(product: Product) {
        this.router.navigate(['Product', {id: product._id}]);
    }

}

