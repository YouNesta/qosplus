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
    success = [];
    error = [];
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
        quantity: null,
    };

    product = {
        "_id": "",
        "name": "",
        "status": null,
        "hydrophily": null,
        "material": "",
        "color": "",
        "ametropia": "",
        "middlePrice": null,
        "port": "",
        "portDuration": null ,
        "reference": null,
        "image": {
            "original": "",
            "small": "",
            "medium": "",
            "big": ""
        },
        "item": [
            {
                "radius": null,
                "diameter": null,
                "addition": null,
                "axis": null,
                "cylinder": null,
                "condition":  null,
                "sphere": [{
                    "sphere": null,
                    "stock": null,
                    "reference": ""
                }],
                "spheres": []
            }
        ],
        "param": [
            {
                "diameter": [
                    null
                ],
                "addition": [
                    null
                ],
                "cylinder": [
                    null
                ],
                "radius": [
                    null
                ],
                "axis": [
                    null
                ],
                "sphere": [
                    null
                ]
            }
        ],
        "ownerPrice": [
            {
                "owner": "",
                "quantity": null,
                "price": null
            }
        ],
        "price": [
            {
                "type": null,
                "price": "",
                "name": ""
            }
        ],
        "type": {
            "toric": false,
            "progressiv": false
        }
    };

    item = {
        _id: null,
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

    changeSphere(sphere){
        this.diameter = [];
        this.radius = [];
        this.cylinder = [];
        this.axis = [];
        this.addition = [];

        this.cartProduct.diameter = null;
        this.cartProduct.radius = null;
        this.cartProduct.cylinder = null;
        this.cartProduct.axis = null;
        this.cartProduct.addition = null;

        for (var i in this.product.item) {
            for (var n in this.product.item[i].spheres) {
                if(this.product.item[i].spheres[n] == sphere){
                    if(this.diameter.indexOf(this.product.item[i].diameter) == -1){
                        this.diameter.push(this.product.item[i].diameter);
                        break
                    }
                }
            };
        };
    }

    changeDiameter(diameter){
        this.radius = [];
        this.cylinder = [];
        this.axis = [];
        this.addition = [];

        this.cartProduct.radius = null;
        this.cartProduct.cylinder = null;
        this.cartProduct.axis = null;
        this.cartProduct.addition = null;

        for (var i in this.product.item) {
                if(this.product.item[i].diameter == diameter){
                    for(var n in this.product.item[i].spheres){
                        if(this.product.item[i].spheres[n] == this.cartProduct.sphere){
                            if(this.radius.indexOf(this.product.item[i].radius) == -1){
                                this.radius.push(this.product.item[i].radius);
                                break
                            }
                        }
                    }
                }
        };
    }

    changeRadius(radius) {
        this.cylinder = [];
        this.axis = [];
        this.addition = [];

        this.cartProduct.cylinder = null;
        this.cartProduct.axis = null;
        this.cartProduct.addition = null;

            for (var i in this.product.item) {
                if(this.product.item[i].diameter == this.cartProduct.diameter
                    && this.product.item[i].radius == radius){
                    for(var n in this.product.item[i].spheres){
                        if(this.product.item[i].spheres[n] == this.cartProduct.sphere){
                            if(this.cylinder.indexOf(this.product.item[i].cylinder) == -1){
                                this.cartProduct.radius = radius;
                                this.cylinder.push(this.product.item[i].cylinder);
                                this.changeCylinder(radius);
                                break
                            }
                        }
                    }
                }
            };


    }

    changeCylinder(radius, cylinder = null){
        this.axis = [];
        this.addition = [];

        this.cartProduct.axis = null;
        this.cartProduct.addition = null;

            for (var i in this.product.item) {
                if(this.product.item[i].diameter == this.cartProduct.diameter
                    && this.product.item[i].radius == radius
                    && this.product.item[i].cylinder == cylinder){
                    for(var n in this.product.item[i].spheres){
                        if(this.product.item[i].spheres[n] == this.cartProduct.sphere){

                            if(this.axis.indexOf(this.product.item[i].axis) == -1){
                                this.axis.push(this.product.item[i].axis);
                                this.changeAxis(null);
                                break
                            }
                        }
                    }
                }
            };

    }

    changeAxis(axis){

        this.addition = [];
        this.cartProduct.addition = null;
            for (var i in this.product.item) {
                if(this.product.item[i].diameter == this.cartProduct.diameter
                    && this.product.item[i].radius == this.cartProduct.radius
                    && this.product.item[i].cylinder == this.cartProduct.cylinder
                    && this.product.item[i].axis == axis){
                    for(var n in this.product.item[i].spheres){

                        if(this.product.item[i].spheres[n] == this.cartProduct.sphere){
                            console.log('axis');

                            if(this.addition.indexOf(this.product.item[i].addition) == -1){
                                this.addition.push(this.product.item[i].addition);
                                this.changeAddition(null);
                                break
                            }
                        }
                    }
                }
        }
    }


    changeAddition(addition){
            for (var i in this.product.item) {
                if(this.product.item[i].diameter == this.cartProduct.diameter
                    && this.product.item[i].radius == this.cartProduct.radius
                    && this.product.item[i].cylinder == this.cartProduct.cylinder
                    && this.product.item[i].axis == this.cartProduct.axis
                    && this.product.item[i].addition == addition){
                    for(var n in this.product.item[i].sphere){

                        if(this.product.item[i].sphere[n].sphere == this.cartProduct.sphere){
                            this.cartFinal.item = this.cartProduct
                            this.cartFinal.item._id = this.product.item[i]._id
                            this.cartFinal.sphere = this.product.item[i].sphere[n]
                            this.cartFinal.reference = this.product.item[i].sphere[n].reference
                        }
                    }
                }
        }
    }


    addProductToCart() {
        var success = true;
        this.success = [];
        this.error = [];

        this.cartFinal._id = this.product._id;
        this.cartFinal.image = this.product.image;
        //this.cartFinal.reference = this.product.image;
        this.cartFinal.name = this.product.name;
        this.cartFinal.hydrophily = this.product.hydrophily;
        this.cartFinal.material = this.product.material;
        this.cartFinal.color = this.product.color;
        this.cartFinal.price = this.product.price;
        this.cartFinal.quantity = this.cartProduct.quantity;

        if(this.cartProduct.sphere == null || this.cartProduct.diameter == null || this.cartProduct.radius == null){
            success = false;
            this.error.push("Veuillez renseigner tout les parametres demandé");
        }

        if(this.cartProduct.quantity <= 0 || isNaN(this.cartProduct.quantity)) {
            success = false;
            this.error.push("La quantité n'est pas valide");
        }

        if(this.product.type.progressiv && this.cartProduct.addition == null){
            success = false;
            this.error.push("Veuillez renseigner tout les parametres demandé");
        }

        if(this.product.type.toric && (this.cartProduct.cylinder === null || this.cartProduct.axis === null)){
            success = false;
            this.error.push("Veuillez renseigner tout les parametres demandé");
        }

       if(success){
           var cart = [];
           var local = JSON.parse(localStorage.getItem("cart"));
           if (local != null) {cart = local;}
           cart.push(this.cartFinal);
           localStorage.setItem("cart", JSON.stringify(cart));
           this.success.push("Produit ajouté au panier");

           var thus = this
           setTimeout(function(){
                thus.success = [];
                thus.error = [];
           }, 3500)
       }
    }

    ngOnChanges(changes: {[productCart: string]: SimpleChange}) {
        this.success = [];
        this.error = [];

        this.sphere = [];
        this.diameter = [];
        this.radius = [];
        this.cylinder = [];
        this.axis = [];
        this.addition = [];

        this.cartProduct = {
            diameter: null,
            addition: null,
            cylinder: null,
            radius: null,
            axis: null,
            sphere: null,
        };

        if(changes['productCart']){
            if (typeof changes['productCart'].currentValue !== "undefined" && changes['productCart'].currentValue !== "undefined") {
                this.product = JSON.parse(changes['productCart'].currentValue);

                for (var i in this.product.param[0].sphere) {
                        if(this.sphere.indexOf(this.product.param[0].sphere[i]) == -1){
                            this.sphere.push(this.product.param[0].sphere[i]);
                        }
                }
            }
        }
    }
}
