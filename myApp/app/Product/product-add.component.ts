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
            diameter: ["11"],
            addition: [],
            cylinder: ["12"],
            radius: ["5"],
            axis: ["5"],
        },
        item:[
            {
                radius: null,
                addition: null,
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
