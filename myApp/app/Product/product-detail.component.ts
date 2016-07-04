import {Component} from 'angular2/core';
import {ProductFactory} from "./product.factory";

@Component({
    providers: [],
    templateUrl: "app/Product/product-detail.html",
    directives: []

})

export class ProductDetailComponent {

    constructor(public service: ProductFactory){

    }
}