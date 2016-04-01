import {Component} from 'angular2/core';
import {ProductFactory} from "./product.factory";


@Component({
    providers: [],
    templateUrl: "app/Product/product-list.html",
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