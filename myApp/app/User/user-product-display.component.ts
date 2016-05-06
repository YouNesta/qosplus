import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "../Product/product.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';


@Component({
    providers: [],
    templateUrl: "app/User/user-product-display.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class UserProductComponent {

    product: Object;
    productId: Object;

    constructor(public service: ProductFactory, params: RouteParams, public router: Router){
        this.productId = params.get('id');
        this.service.getOneProduct(this.productId)
            .subscribe(
                response => {
                    if(response.success){
                        this.product = response.data;
                        console.log(this.product)
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('get product list Complete')
            );
    }

}

