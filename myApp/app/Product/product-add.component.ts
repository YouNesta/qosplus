import {Component, Input, forwardRef, Inject, NgZone} from 'angular2/core';
import {Product} from "./product";
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";
import {TagInputComponent} from "angular2-tag-input";
import {AlertService} from "../Tools/alert";
import {UPLOAD_DIRECTIVES} from 'ng2-uploader';


@Component({
    selector: "product-add",
    templateUrl: "app/Product/product-add.html",
    directives: [TagInputComponent, UPLOAD_DIRECTIVES]
})


export class ProductAddComponent {
    @Input() modal;
    subscribeForm: ControlGroup;
    uploadFile: any;
    uploadProgress: number;
    uploadResponse: Object;
    zone: NgZone;
    options: Object = {
        url: 'http://192.168.33.10:2028/upload'
    };

    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    }

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
            condition: "30",
            stock: 0,
            provider: false
        }
    ];

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
        status: 1,
        image: {
            original: "public/uploads/no_image.png",
            small: "public/uploads/no_image.png",
            medium: "public/uploads/no_image.png",
            big: "public/uploads/no_image.png"
        },
        hydrophily: 56,
        material: "Verre",
        color: "Transparent",
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

    alertService: AlertService;

    priceSheet = [];

    constructor(public service: ProductFactory, fb: FormBuilder, regEx: RegEx,  @Inject(forwardRef(() => AlertService)) alertService){
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

    handleUpload(data): void {
        this.uploadFile = data;
        this.zone.run(() => {
            this.uploadProgress = data.progress.percent;
        });
        let resp = data.response;
        if (resp) {
            resp = JSON.parse(resp);
            this.uploadResponse = resp;
            this.products.image = {
                original: 'public/uploads/'+resp.data[0].generatedName,
                small: 'public/uploads/'+resp.data[0].generatedNameSmall,
                medium: 'public/uploads/'+resp.data[0].generatedNameMedium,
                big: 'public/uploads/'+resp.data[0].generatedNameBig
            }
        }
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
        this.items.push({
            radius: null,
            diameter: null,
            addition: {
                min: 0,
                max: 0,
                int:0
            },
            axis: {
                min: 0,
                max: 0,
                int:0
            },
            cylinder: {
                min: 0,
                max: 0,
                int:0
            },
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
    deleteProduct() {
        this.items.pop();
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


    addItem(){

        for (var i in this.items) {
            if(this.products.param["diameter"].indexOf(this.items[i].diameter) == -1)
                this.products.param["diameter"].push(this.items[i].diameter);

            if(this.products.param["radius"].indexOf(this.items[i].radius) == -1)
                this.products.param["radius"].push(this.items[i].radius);

            for (var c = this.items[i].cylinder.min; c <= this.items[i].cylinder.max; c += this.items[i].cylinder.int) {
                if(this.products.param["cylinder"].indexOf(c) == -1)
                    this.products.param["cylinder"].push(c);

                for (var a = this.items[i].addition.min; a <= this.items[i].addition.max; a += this.items[i].addition.int) {
                    if(this.products.param["addition"].indexOf(a) == -1)
                        this.products.param["addition"].push(a);

                    for (var ax = this.items[i].axis.min; ax <= this.items[i].axis.max; ax += this.items[i].axis.int) {
                        if(this.products.param["axis"].indexOf(c) == -1)
                            this.products.param["axis"].push(c);
                        console.log(this.items[i].sphere)
                        this.products.item.push({
                            radius: this.items[i].radius,
                            diameter: this.items[i].diameter,
                            addition: a,
                            axis: ax,
                            cylinder: c,
                            sphere: this.items[i].sphere,
                            condition: "30",
                            stock: 0,
                            provider: false
                        });
                    }
                }
            }
        }


    };


    dropParams(type) {
        this.products.param[type] = [];
    }
    addOwnerPrice(type) {
        this.products.ownerPrice.push({
            owner: null,
            quantity: 0,
            price: 0
        });
    }
    deleteOwnerPrice(type) {
        this.products.ownerPrice.pop();
    }

    middlePrice(){
        var nbBox = 0;
        var total = 0;
        for(var i in this.products.ownerPrice){
            nbBox += this.products.ownerPrice[i].quantity;
            total += this.products.ownerPrice[i].price *  this.products.ownerPrice[i].quantity;
        }
        var response = total / nbBox
        if(isNaN(response)){
            return 0;
        }else{
            return response.toFixed(2) ;
        }
    }

}
