import {Component, Input, forwardRef, Inject, NgZone} from 'angular2/core';
import {Product} from "./product";
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";
import {TagInputComponent} from "angular2-tag-input";
import {AlertService} from "../Tools/alert";
import {UPLOAD_DIRECTIVES} from 'ng2-uploader';
import {ProductModalComponent} from "./product-modal.component";


@Component({
    selector: "product-edit",
    templateUrl: "app/Product/product-edit.html",
    directives: [TagInputComponent, UPLOAD_DIRECTIVES],
    input: ['products']
})


export class ProductEditComponent extends ProductModalComponent{
    @Input() modal;
    subscribeForm: ControlGroup;
    uploadFile: any;
    uploadProgress: number;
    uploadResponse: Object;
    zone: NgZone;
    options: Object = {
        url: 'http://192.168.33.10:2028/upload'
    };

    items = [
        {
            radius: null,
            diameter: null,
            addition: {
                min: null,
                max: null,
                int:null
            },
            axis: {
                min: null,
                max: null,
                int:null
            },
            cylinder: {
                min: null,
                max: null,
                int:null
            },
            sphere: {
                min: null,
                max: null,
                int: null
            },
            condition: "",
            stock: 0,
            provider: false
        }
    ];

     products = {
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
        param: {
            diameter: [],
            addition: [],
            cylinder: [],
            radius: [],
            axis: [],
        },
        item:[
        ]

    };

    constructor(public service: ProductFactory, fb: FormBuilder, regEx: RegEx,  @Inject(forwardRef(() => AlertService)) alertService){
        console.log(this.products);
        this.alertService = alertService;
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
                /* Validators.required,
                 Validators.maxLength(30)*/
            ])],
        });

        this.uploadProgress = 0;
        this.uploadResponse = {};
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.service.countProductPrice()
            .subscribe(
                res => {
                    if(res.success){
                        for (var i in res.data) {
                            this.products.price.push({type: res.data[i].type, name: res.data[i].name, _id: res.data[i]._id, price: 0});
                        }
                        this.priceSheet = res.data;
                    }else{
                        this.alertService.addAlert('warning', res.message);
                    }
                },
                err => {
                    this.alertService.addAlert('danger', 500);
                },
                () => console.log('Product Price get with success')
            );
    }

    save() {
        this.addItem();

        for (var i in this.products.item) {
            if (this.products.item[i].provider) {
                this.products.item[i].stock = -1;
            }
            if(this.products.param["addition"].indexOf(this.products.item[i].addition) == -1)
                this.products.param["addition"].push(this.products.item[i].addition);
        }
        this.products.middlePrice = this.middlePrice();
        this.service.save(this.products)
            .subscribe(
                res => {
                    if(res.success){
                        this.modal.close();
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
