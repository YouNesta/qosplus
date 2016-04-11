import {Component} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {ProductAddComponent} from "./product-add.component";


@Component({
    providers: [],
    templateUrl: "app/Product/product-list.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES, ProductAddComponent]

})

export class ProductListComponent {

    products: any;

    constructor(public service: ProductFactory){
        this.service.getProduct()
            .subscribe(
                response => {
                    if(response.success){
                        this.products = response.data;
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('get product list Complete')
            );
    }
}