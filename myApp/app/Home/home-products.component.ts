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
        this.products = this.getProductsSupplier();
    }

    getProductsSupplier(){
        this.service.getProduct()
            .subscribe(
                response => {
                    if(response.success){

                        response.data.sort(compare);
                        console.log(response.data);
                        this.products = response.data;

                        function compare(a,b) {
                            if (a.supplier < b.supplier)
                                return -1;
                            if (a.supplier > b.supplier)
                                return 1;
                            return 0;
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

