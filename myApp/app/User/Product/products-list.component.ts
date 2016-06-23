import {Component} from 'angular2/core';
import {ProductFactory} from "../../Product/product.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ProductAddCartComponent} from "../../Product/product-add-cart.component";
import {TagInputComponent} from "angular2-tag-input";


@Component({
    providers: [ProductFactory],
    templateUrl: "app/User/Product/products-list.html",
    directives: [ MODAL_DIRECTIVES, ProductAddCartComponent]
})

export class UserProductsListComponent {
    products: Object ;
    productCart: String;
    isOpen = [];



    constructor(public service: ProductFactory){
        this.getProducts();
    }

    loadModalProduct(product, modal) {
        modal.open();
        this.productCart = JSON.stringify(product);
    }

    getProducts(){
        this.service.getProduct()
            .subscribe(
                response => {
                    if(response.success){
                        this.products = response.data;
                        for(var i in this.products){
                            this.isOpen.push(false);
                        }
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('get product list Complete')
            );
    }
}

