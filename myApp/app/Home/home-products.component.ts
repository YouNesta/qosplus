import {Component} from 'angular2/core';
import {ProductFactory} from "../Product/product.factory";


@Component({
    selector: "test",
    templateUrl: "app/Home/home-products.html",
    providers:[ProductFactory]
})

export class HomeProductsComponent {
    products: Object;


    constructor(public service: ProductFactory){

    }

    getProductsSupplier(){
        this.service.getProductBySupplier()
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

