import {Component, Input, forwardRef, Inject, NgZone} from 'angular2/core';
import {Product} from "./product";
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {AlertService} from "../Tools/alert";
import {TagInputComponent} from "angular2-tag-input";


@Component({
    selector: "product-edit",
    templateUrl: "app/Product/product-edit.html",
    directives: [TagInputComponent]
})


export class ProductEditComponent {
    @Input() modal;
    @Input() productCart;
    subscribeForm: ControlGroup;

    changed = [];

    items = [
        {
            radius: null,
            diameter: null,
            addition: null,
            axis: null,
            cylinder: null,
            sphere: null,
        }
    ];

    product = {
        name: "",
        status: 1,
        image: {
            original: "public/uploads/no_image.png",
            small: "public/uploads/no_image.png",
            medium: "public/uploads/no_image.png",
            big: "public/uploads/no_image.png"
        },
        type: {
            toric : false,
            progressiv: false
        },
        hydrophily: 0,
        material: "",
        color: "",
        ametropia: "",
        price: [{
            "type": 0,
            "price": 0,
            "name": "Catalogue"
        }],
        ownerPrice: [
            {
                owner: null,
                quantity: 0,
                price: 0
            }
        ],
        middlePrice: 0,
        param: [{
            diameter: [],
            addition: [],
            cylinder: [],
            radius: [],
            axis: [],
        }],
        item:[
        ]

    };

    alertService: AlertService;

    constructor(public service: ProductFactory, fb: FormBuilder,  @Inject(forwardRef(() => AlertService)) alertService){
        this.alertService = alertService;
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
                /* Validators.required,
                 Validators.maxLength(30)*/
            ])],
        });
    }

    removeItem(i, s) {
        var sphere = this.product.item[i].sphere[s].sphere;
        console.log(sphere)

        if (this.product.item[i].spheres.indexOf(sphere) != -1) {
            this.product.item[i].spheres.splice(this.product.item[i].spheres.indexOf(sphere), 1);
        }
        this.product.item[i].sphere.splice(s, 1);

        console.log(this.product.item[i])
    }

    saveProduct() {
        this.service.editProduct(this.product)
            .subscribe(
                res => {
                    if(res.success){
                        console.log('yey');
                    }else{
                        this.alertService.addAlert('warning', res.message);
                    }
                },
                err => {
                    this.alertService.addAlert('danger', 500);
                },
                () => console.log('Product updated')
            );
    }

    ngOnChanges(changes: {[productCart: string]: SimpleChange}) {


        if(changes['productCart']){
            if (typeof changes['productCart'].currentValue !== "undefined" && changes['productCart'].currentValue !== "undefined") {
                this.product = JSON.parse(changes['productCart'].currentValue);
                console.log(this.product);

                this.items = [];
                this.changed = [];


            }
        }
    }

    addOwnerPrice(type) {
        this.product.ownerPrice.push({
            owner: null,
            quantity: 0,
            price: 0
        });
    }
    deleteOwnerPrice(type) {
        if(this.product.ownerPrice.length > 1)
            this.product.ownerPrice.pop();
    }

    middlePrice(){
        var nbBox = 0;
        var total = 0;
        for(var i in this.product.ownerPrice){
            nbBox += this.product.ownerPrice[i].quantity;
            total += this.product.ownerPrice[i].price *  this.product.ownerPrice[i].quantity;
        }
        var response = total / nbBox
        if(isNaN(response)){
            return 0;
        }else{
            return response.toFixed(2) ;
        }
    }
}