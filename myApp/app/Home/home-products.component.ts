import {Component} from 'angular2/core';
import {ProductFactory} from "../Product/product.factory";


@Component({
    selector: "test",
    templateUrl: "app/Home/home-products.html",
    providers:[ProductFactory]
})

export class HomeProductsComponent {
    products: Object;
    isOpen = [];
    spheres = {};
    sphereIndexes = [];


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

                        for(var i in this.products){
                            this.isOpen.push(false);
                        }
                        for (var i in this.products) {
                            this.spheres[i] = [];
                            this.sphereIndexes[i] = [];
                            for (var j in this.products[i].item) {
                                for (var k in this.products[i].item[j].sphere) {
                                    var isNegative = false;
                                    var sphere = this.products[i].item[j].sphere[k].sphere;
                                    if (sphere < 0) {
                                        isNegative = true;
                                        sphere *= -1;
                                    }
                                    var floor = Math.floor(sphere);
                                    var index = floor.toString();
                                    if (isNegative) {
                                        index = "-"+index;
                                        sphere *= -1;
                                    }
                                    if (this.spheres[i][index] == null) this.spheres[i][index] = [];
                                    if (this.spheres[i][index].indexOf(sphere) == -1) {
                                        this.spheres[i][index].push(sphere);
                                        this.sphereIndexes[i] = Object.keys(this.spheres[i]);
                                    }
                                }
                            }
                            this.sphereIndexes[i].sort();
                        }

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

