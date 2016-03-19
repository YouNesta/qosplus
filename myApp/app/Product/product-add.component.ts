import {Component} from 'angular2/core';
import {Product} from "./product";
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";

@Component({
    providers: [],
    templateUrl: "app/Product/product-add.html",
})


export class ProductAddComponent {
    service: ProductFactory ;

    subscribeForm: ControlGroup;

    model = {
        name: "MyFirstLens",
        material: 1,
        color: 2,
        hydrophily: 69,
        diameter: [7.7],
        radius: [50],
        sphere: [-7.5, -7, -6.5],
        cylinder: [],
        axis: [],
        addition: [],
        stock: [2, 2, 4],
    };


    constructor(productFactory: ProductFactory, fb: FormBuilder, regEx: RegEx){
        this.service = productFactory;
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
                /* Validators.required,
                 Validators.maxLength(30)*/
            ])],
        });
    }


    subscribe(){
        if(this.subscribeForm.valid){
            this.product = this.model;

            this.service.save(this.product);
        }


    }
}
