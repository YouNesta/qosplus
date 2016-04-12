import {Component} from 'angular2/core';
import {Product} from "./product";
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";
import {TagInputComponent} from "../lib/tag-input.component";


@Component({
    selector: "product-add",
    templateUrl: "app/Product/product-add.html",
    directives: [TagInputComponent]
})


export class ProductAddComponent {
    service: ProductFactory ;
    subscribeForm: ControlGroup;


    int = {
        axis : {
            min: 0,
            max: 0,
            int:0
        },
        addition : {
            min: 0,
            max: 0,
            int:0
        },
        cylinder : {
            min: 0,
            max: 0,
            int:0
        }
    };

    model = {
        diameter: [],
        addition: [],
        cylinder: [],
        radius: [],
        axis: [],
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


    products = {
        name: "Younesta",
        hydrophily: 56,
        material: "",
        color: "",
        param: {
            diameter: [],
            addition: [],
            cylinder: [],
            radius: [],
            axis: [],
        },
        item:[
            {
                diameter: null,
                addition: null,
                cylinder: null,
                radius: null,
                axis: null,
                sphere: {
                    min: 0,
                    max: 0,
                    int: 0
                }
                condition:null,
                stock: null
                provider: false
            }
        ]

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

    addParams(type){
        if(this.int[type].max != 0 && this.int[type].int != 0) {
            var i;
            for (i = this.int[type].min; i <= this.int[type].max;) {
                if(this.products.param[type].indexOf(i) == -1)
                    this.products.param[type].push(i);
                i = i + this.int[type].int;
            }
            for(i in this.int[type]){
                 this.int[type][i] = 0
            }
        }
    }

    addProduct(){
       this.products.item.push(  {
           diameter: null,
           addition: null,
           cylinder: null,
           radius: null,
           axis: null,
           sphere: {
               min: 0,
               max: 0,
               int: 0
           }
           condition:null,
           stock: null


       })
    }

    save(){
        console.log(this.products)
    }
}
