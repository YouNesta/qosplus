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
        price: 10,
        product: []
    };

    //va stocker les valeurs renseignées par le min/max/pas
    value = {
        diameter: [0],
        addition: [0],
        cylinder: [0],
        radius: [0],
        axis: [0],
        sphere: [0],
    };

    //savoir quels ids récupérer
    ids = {
        axis: {
            min: "#axis",
            max: "#axis-max",
            inter: "#axis-interval"
        },
        addition: {
            min: "#addition",
            max: "#addition-max",
            inter: "#addition-interval"
        },
        cylindre: {
            min: "#cylindre",
            max: "#cylindre-max",
            inter: "#cylindre-interval"
        },
        sphere: {
            min: "#sphere",
            max: "#sphere-max",
            inter: "#sphere-interval"
        },
    }


    constructor(productFactory: ProductFactory, fb: FormBuilder, regEx: RegEx){
        this.service = productFactory;
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
                /* Validators.required,
                 Validators.maxLength(30)*/
            ])],
        });
    }

    //stock all the value (calculated with max, min and interval) in an array with name
    addValue(name) {
        var min:string = (<HTMLInputElement> document.getElementById(this.ids["name"].min).value);
        var max:string = (<HTMLInputElement> document.getElementById(this.ids["name"].max).value);
        var inter:string = (<HTMLInputElement> document.getElementById(this.ids["name"].inter).value);

        if (min != "" && max != "" && inter != "") {
            if (this.value[name] == [0]) this.value[name] = [];

            for (var i = min; i <= max; i += inter) {
                this.value[name].push(i);
            }
        }

    }

    add(){
        if(this.subscribeForm.valid){

            //récupère toutes les valeurs et crée un produit avec chacune d'entre elle
            for (var diameter of this.value.diameter) {
                for (var addition of this.value.addition) {
                    for (var cylinder of this.value.cylinder) {
                        for (var radius of this.value.radius) {
                            for (var axis of this.value.axis) {
                                for (var sphere of this.value.sphere) {
                                    this.model.product.push({
                                        diameter: diameter,
                                        addition: addition,
                                        cylinder: cylinder,
                                        radius: radius,
                                        axis: axis,
                                        sphere: sphere,
                                        stock: -1
                                    });
                                }
                            }
                        }
                    }
                }
            }

            this.product = this.model;
            console.log(this.model);
            this.service.save(this.product);
        }
    }
}
