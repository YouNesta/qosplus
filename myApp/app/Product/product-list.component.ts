import {Component, Input} from 'angular2/core';
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

    products: Object = {
        name: "Younesta",
        image: "public/uploads/no_image.png",
        hydrophily: 56,
        material: "Verre",
        color: "Transparent",
        price: 55,
        param: {
            diameter: ["11"],
            addition: ["+25"],
            cylinder: ["12"],
            radius: ["5"],
            axis: ["5"],
        },
        item:[
            {
                radius: null,
                diameter: null,
                axis: null,
                addition: null,
                cylinder: null,
                sphere: {
                    min: 0,
                    max: 0,
                    int: 0.25
                },
                condition: "30",
                stock: 0,
                provider: false
            }
        ]

    };

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

    loadModalProduct(product) {
        this.product = product;
        console.log(this.product);
    }

}