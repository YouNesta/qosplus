import {Component, Input, forwardRef, Inject} from 'angular2/core';
import {Product} from "./product";
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";
import {TagInputComponent} from "angular2-tag-input";
import {AlertService} from "../Tools/alert";


@Component({
    selector: "product-add",
    templateUrl: "app/Product/product-add.html",
    directives: [TagInputComponent]
})


export class ProductAddComponent {
    @Input() modal;
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
        0.5,
        1,
        1.25,
        1.5,
        2,
        2,25,
        2.5,
        3
    ];

    products = {
        name: "Younesta",
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

    addProduct() {
        this.products.item.push({
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
        });
    }

    save() {

            for (var i in this.products.item) {
                if (this.products.item[i].provider) {
                    this.products.item[i].stock = -1;
                }
            }
            this.service.save(this.products)
                .subscribe(
                    res => {
                        if(res.success){
                            this.modal.close()
                            this.alertService.addAlert('success', res.message);
                        }else{
                            this.alertService.addAlert('warning', res.message);
                        }
                    },
                    err => {
                        this.alertService.addAlert('danger', 500);
                    },
                    () => console.log('Product Added')
                );
        }

}
