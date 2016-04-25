import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {ProductAddComponent} from "./product-add.component";
import {ProductAddCartComponent} from "./product-add-cart.component";
import {TagInputComponent} from "angular2-tag-input";


@Component({
    providers: [],
    templateUrl: "app/Product/product-list.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES, ProductAddComponent, ProductAddCartComponent]

})

export class ProductListComponent {

    products: Object ;
    productCart: String;


    constructor(public service: ProductFactory){
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

    loadModalProduct(product, modal) {
        modal.open();
        this.productCart = JSON.stringify(product);
    }

}