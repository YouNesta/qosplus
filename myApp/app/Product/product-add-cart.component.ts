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

    axis = [];
    addition = [];
    cylinder = [];
    condition = [];
    radius = [];
    diameter = [];
    sphere = [];

    cartProduct = {
        diameter: null,
        addition: null,
        cylinder: null,
        radius: null,
        axis: null,
        sphere: null,
    };

    product = {
        _id: "",
        name: "Younestaaa",
        status: 1,
        image: "public/uploads/no_image.png",
        hydrophily: 56,
        material: "Verre",
        color: "Transparent",
        price: [],
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

    item = {
        radius: null,
        diameter: null,
        axis: null,
        addition: null,
        cylinder: null,
        sphere: [{
            sphere: 0,
        }],
        condition: "30",
        stock: 0,
        provider: false
    };


    cartFinal = {
        _id: '',
        image: '',
        name: '',
        hydrophily: null,
        material: '',
        color: '',
        price: [],
        item: Object,
        quantity: 0,
        eye: 'droit'
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

    changeDiameter(diameter){
        this.axis = [];
        this.addition = [];
        this.cylinder = [];
        this.condition = [];
        this.radius = [];
        for (var i in this.product.item) {
            if(this.product.item[i].diameter == diameter){
                if(this.axis.indexOf(this.product.item[i].axis) == -1){
                    this.axis.push(this.product.item[i].axis);
                }
            }
        }

    }
    changeAxis(axis){
        this.cylinder = [];
        this.condition = [];
        this.radius = [];
        this.addition = [];

        for (var i in this.product.item) {
            if(this.product.item[i].axis == axis && this.product.item[i].diameter == this.cartProduct.diameter){
                if(this.cylinder.indexOf(this.product.item[i].cylinder) == -1){
                    this.cylinder.push(this.product.item[i].cylinder);
                }
            }
        }
    }

    changeCylinder(cylinder){
        this.condition = [];
        this.radius = [];
        this.addition = [];


        for (var i in this.product.item) {
            if(this.product.item[i].cylinder == cylinder
                && this.product.item[i].diameter == this.cartProduct.diameter
                && this.product.item[i].axis == this.cartProduct.axis
            ){
                console.log('equal');
                if(this.condition.indexOf(this.product.item[i].condition) == -1){
                    this.condition.push(this.product.item[i].condition);
                }
            }
        }
    }


    changeCondition(condition){
        this.radius = [];
        this.addition = [];

        for (var i in this.product.item) {
            if(this.product.item[i].condition == condition
                && this.product.item[i].cylinder == this.cartProduct.cylinder
                && this.product.item[i].diameter == this.cartProduct.diameter
                && this.product.item[i].axis == this.cartProduct.axis
            ){
                if(this.radius.indexOf(this.product.item[i].radius) == -1){
                    this.radius.push(this.product.item[i].radius);
                }
            }
        }


    }
    changeRadius(radius) {
        this.addition = [];

        for (var i in this.product.item) {
            if(  this.product.item[i].radius == radius
                && this.product.item[i].condition == this.cartProduct.condition
                && this.product.item[i].cylinder == this.cartProduct.cylinder
                && this.product.item[i].diameter == this.cartProduct.diameter
                && this.product.item[i].axis == this.cartProduct.axis
            ){
                if(this.addition.indexOf(this.product.item[i].addition) == -1){
                    this.addition.push(this.product.item[i].addition);
                }
            }
        }
    }
    changeAddition(addition){
        this.sphere = [];

        for (var i in this.product.item) {
            if( this.product.item[i].addition == addition
                && this.product.item[i].radius == this.cartProduct.radius
                && this.product.item[i].condition == this.cartProduct.condition
                && this.product.item[i].cylinder == this.cartProduct.cylinder
                && this.product.item[i].diameter == this.cartProduct.diameter
                && this.product.item[i].axis == this.cartProduct.axis
            ){
                if(this.sphere.indexOf(this.product.item[i].sphere) == -1){
                    for (var n in this.product.item[i].sphere) {
                        var sphereLength = this.sphere.push(this.product.item[i].sphere[n])
                        this.sphere[sphereLength - 1].radius =  this.cartProduct.radius;
                        this.sphere[sphereLength - 1].axis =  this.cartProduct.axis;
                        this.sphere[sphereLength - 1].condition =  this.cartProduct.condition;
                        this.sphere[sphereLength - 1].cylinder =  this.cartProduct.cylinder;
                        this.sphere[sphereLength - 1].diameter =  this.cartProduct.diameter;
                        this.sphere[sphereLength - 1].radius =  this.cartProduct.radius;
                        this.sphere[sphereLength - 1].addition =  addition;
                    }
                }
            }
        }
    }
    changeSphere(i){
        this.cartFinal.item = this.sphere[i];
    }

    addProductToCart(product) {
        this.cartFinal._id = this.product._id;
        this.cartFinal.image = this.product.image;
        //this.cartFinal.reference = this.product.image;
        this.cartFinal.name = this.product.name;
        this.cartFinal.hydrophily = this.product.hydrophily;
        this.cartFinal.material = this.product.material;
        this.cartFinal.color = this.product.color;
        this.cartFinal.price = this.product.price;

        var cart = [];
        var local = JSON.parse(localStorage.getItem("cart"));
        if (local != null) {cart = local;}
        cart.push(this.cartFinal);
        localStorage.setItem("cart", JSON.stringify(cart));
        this.alertService.addAlert('success', "Product successfully added to the cart.");
        return "Product added in cart";
    }

    ngOnChanges(changes: {[productCart: string]: SimpleChange}) {
        if(changes['productCart']){
            if (typeof changes['productCart'].currentValue !== "undefined" && changes['productCart'].currentValue !== "undefined") {
                this.product = JSON.parse(changes['productCart'].currentValue);
                for (var i in this.product.item) {
                        if(this.diameter.indexOf(this.product.item[i].diameter) == -1){
                            this.diameter.push(this.product.item[i].diameter);
                        }
                }
            }
        }
    }
}
