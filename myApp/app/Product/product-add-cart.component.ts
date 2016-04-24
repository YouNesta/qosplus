import {Component, Input, forwardRef, Inject, NgZone} from 'angular2/core';
import {Product} from "./product";
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";
import {TagInputComponent} from "angular2-tag-input";
import {AlertService} from "../Tools/alert";


@Component({
    selector: "product-add-cart",
    templateUrl: "app/Product/product-add-cart.html",
    directives: [TagInputComponent]
})


export class ProductAddCartComponent {
    @Input() modalCart;
    @Input() product: Object;
    subscribeForm: ControlGroup;

    int = {
        axis : 0,
        addition : 0,
        cylinder : 0
    };

    materials= [
        "Verre",
        "Plexiglass"
    ];

    colors=[
        "Transparent",
        "Bleu",
        "Vert",
        "Marron"
    ];
    conditions = [
        "10",
        "30",
        "60",
        "90"
    ];

    intervales = [
        0.25,
    ];

    product = {
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
            sphere: ["2"]
        },
        client: "Younes Nesta",
        quantity: 1

    };

    alertService: AlertService;

    constructor(public service: ProductFactory, fb: FormBuilder, regEx: RegEx,  @Inject(forwardRef(() => AlertService)) alertService){
        this.alertService = alertService;
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
                /* Validators.required,
                 Validators.maxLength(30)*/
            ])],
        });
    }

    loadProduct(product) {
        this.product = product;
    }

    addProductToCart() {
        var cart = [];
        var local = JSON.parse(localStorage.getItem("cart"));
        if (local != null) {cart = local;}
        cart.push(this.product);
        localStorage.setItem("cart", JSON.stringify(cart));
        return "Product added in cart";
    }

}
