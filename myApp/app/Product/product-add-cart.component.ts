import {Component, Input, forwardRef, Inject,  OnChanges, SimpleChange} from 'angular2/core';
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


export class ProductAddCartComponent  implements  OnChanges{
    @Input() modalCart;
    @Input() productCart;

    subscribeForm: ControlGroup;

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

    cartProduct = {
        name: "Younesta",
        image: "public/uploads/no_image.png",
        hydrophily: 56,
        material: "Verre",
        color: "Transparent",
        price: 55,
        diameter: 11,
        addition: 25,
        cylinder: 12,
        radius: 5,
        axis: 5,
        sphere: 2,
        client: "Younes Nesta",
        quantity: 1

    };

    product: Object = {
        name: "Younestaaa",
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
            sphere: ["3"]
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

    loadProduct() {
        this.product = JSON.parse(localStorage.getItem("product"));
        console.log(this.product);
    }

    addProductToCart() {
        console.log(this.cartProduct);
        var cart = [];
        var local = JSON.parse(localStorage.getItem("cart"));
        if (local != null) {cart = local;}
        cart.push(this.cartProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
        this.alertService.addAlert('success', "Product successfully added to the cart.");
        return "Product added in cart";
    }

    ngOnChanges(changes: {[productCart: string]: SimpleChange}) {
        if(changes['productCart']){
            if (typeof changes['productCart'].currentValue !== "undefined" && changes['productCart'].currentValue !== "undefined") {
                this.product = JSON.parse(changes['productCart'].currentValue);
                console.log(this.product);
            }

        }
    }
}
