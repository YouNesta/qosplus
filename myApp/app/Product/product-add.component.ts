import {Component, Input, forwardRef, Inject, NgZone} from 'angular2/core';
import {Product} from "./product";
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";
import {TagInputComponent} from "angular2-tag-input";
import {AlertService} from "../Tools/alert";
import {UPLOAD_DIRECTIVES} from 'ng2-uploader';
import {API} from "../Config/api";


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
    errors = [];
    options: Object;

    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    }


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
        brand: "",
        name: "",
        status: 1,
        image: {
            original: "public/img/no_image.png",
            small: "public/img/no_image.png",
            medium: "public/img/no_image.png",
            big: "public/img/no_image.png"
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

    alertService: AlertService;

    priceSheet = [];

    constructor(public service: ProductFactory, api:API, fb: FormBuilder, regEx: RegEx,  @Inject(forwardRef(() => AlertService)) alertService){
        this.alertService = alertService;
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
                /* Validators.required,
                 Validators.maxLength(30)*/
            ])],
        });
        this.options = {
            url:  api.upload
        }
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
        console.log(data)
        this.uploadFile = data;
        this.zone.run(() => {
            this.uploadProgress = data.progress.percent;
        });
        let resp = data.response;
        if (resp) {
            resp = JSON.parse(resp);
            this.uploadResponse = resp;
            console.log(resp)
            this.products.image = {
                original: 'public/uploads/'+resp[0].generatedName,
                small: 'public/uploads/'+resp[0].generatedNameSmall,
                medium: 'public/uploads/'+resp[0].generatedNameMedium,
                big: 'public/uploads/'+resp[0].generatedNameBig
            }
        }
    }

    /*    addParams(type){
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
     }*/

    addProduct() {
        this.items.push({
            type: {
                toric : false,
                progressiv: false
            },
            radius: null,
            diameter: null,
            addition: {
                min:  null,
                max:  null,
                int: null
            },
            axis: {
                min:  null,
                max:  null,
                int: null
            },
            cylinder: {
                min:  null,
                max:  null,
                int: null
            },
            sphere: {
                min:  null,
                max:  null,
                int: null
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

        this.errors = [];

        if (this.products.name == "") {this.errors.push("Le champ Nom ne peut être vide");}
        if (this.products.material == "") {this.errors.push("Le champ Material ne peut être vide");}
        if (this.products.color == "") {this.errors.push("Le champ Color ne peut être vide");}

        for (var i in this.products.price) {
            var price = this.products.price[i];
            if (price.price == 0) {this.errors.push("Le champ Prix ne peut être égal à 0");}
        }

        if (this.products.ametropia == "") {this.errors.push("Le champ Amétropie ne peut être vide");}

    /*    if (this.products.type.toric == true || this.products.type.progressiv) {
            for (var i in this.items) {
                var item = this.items[i];
                if (this.products.type.toric == true) {
                    if (item.axis.min == "" || item.axis.min == null) {this.errors.push("L'axe nécessite une valeur minimale");}
                    if (item.axis.max == "" || item.axis.max == null) {this.errors.push("L'axe nécessite une valeur maximale");}
                    if (item.axis.int == "" || item.axis.int == null) {this.errors.push("L'axe nécessite un interval");}

                    if (item.cylinder.min == "" || item.cylinder.min == null) {this.errors.push("Le cylindre nécessite une valeur minimale");}
                    if (item.cylinder.max == "" || item.cylinder.max == null) {this.errors.push("Le cylindre nécessite une valeur maximale");}
                    if (item.cylinder.int == "" || item.cylinder.int == null) {this.errors.push("Le cylindre nécessite un interval");}
                }
                if (this.products.type.progressiv) {
                    if (item.addition.min == "" || item.addition.min == null) {this.errors.push("L'addition nécessite une valeur minimale");}
                    if (item.addition.max == "" || item.addition.max == null) {this.errors.push("L'addition nécessite une valeur maximale");}
                    if (item.addition.int == "" || item.addition.int == null) {this.errors.push("L'addition nécessite un interval");}
                }
            }
        }*/

        if (this.errors.length == 0) {
            this.addItem();
            for (var i in this.products.item) {
                if (this.products.item[i].provider) {
                    this.products.item[i].stock = -1;
                }
                if(this.products.param["addition"].indexOf(this.products.item[i].addition) == -1 && this.products.item[i].addition != null)
                    this.products.param["addition"].push(this.products.item[i].addition);
            }
            this.products.middlePrice = this.middlePrice();
            this.service.save(this.products)
                .subscribe(
                    res => {
                        if(res.success){
                            this.items = [
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

                           this.products = {
                                brand: "",
                                name: "",
                                status: 1,
                                image: {
                                    original: "public/img/no_image.png",
                                    small: "public/img/no_image.png",
                                    medium: "public/img/no_image.png",
                                    big: "public/img/no_image.png"
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


    addItem(){

        for (var i in this.items) {
            if(this.products.param["diameter"].indexOf(this.items[i].diameter) == -1)
                this.products.param["diameter"].push(this.items[i].diameter);

            if(this.products.param["radius"].indexOf(this.items[i].radius) == -1)
                this.products.param["radius"].push(this.items[i].radius);

            if(this.products.type.progressiv){
                if(this.products.type.toric){
                    this.isFull(i);
                }else{
                    this.isProg(i);
                }
            }else if(this.products.type.toric){
                this.isToric(i);
            }else{
                this.isEmpty(i);
            }
        }


    };

    isToric(i){
        console.log('istoric');
        for (var c = this.items[i].cylinder.min; c <= this.items[i].cylinder.max; c += this.items[i].cylinder.int) {
            if(this.products.param["cylinder"].indexOf(c) == -1)
                this.products.param["cylinder"].push(c);

            for (var ax = this.items[i].axis.min; ax <= this.items[i].axis.max; ax += this.items[i].axis.int) {
                if(this.products.param["axis"].indexOf(ax) == -1)
                    this.products.param["axis"].push(ax);

                console.log(this.items[i].sphere)
                this.products.item.push({
                    radius: this.items[i].radius,
                    diameter: this.items[i].diameter,
                    addition: null,
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
    isProg(i){
        console.log('isProg');
        for (var a = this.items[i].addition.min; a <= this.items[i].addition.max; a += this.items[i].addition.int) {
            if(this.products.param["addition"].indexOf(a) == -1)
                this.products.param["addition"].push(a);

            console.log(this.items[i].sphere)
            this.products.item.push({
                radius: this.items[i].radius,
                diameter: this.items[i].diameter,
                addition: a,
                axis: null,
                cylinder: null,
                sphere: this.items[i].sphere,
                condition: "30",
                stock: 0,
                provider: false
            });
        }
    }
    isFull(i){

        console.log('isFull');

        for (var c = this.items[i].cylinder.min; c <= this.items[i].cylinder.max; c += this.items[i].cylinder.int) {
            if(this.products.param["cylinder"].indexOf(c) == -1)
                this.products.param["cylinder"].push(c);

            for (var ax = this.items[i].axis.min; ax <= this.items[i].axis.max; ax += this.items[i].axis.int) {
                if(this.products.param["axis"].indexOf(ax) == -1)
                    this.products.param["axis"].push(ax);

                for (var a = this.items[i].addition.min; a <= this.items[i].addition.max; a += this.items[i].addition.int) {
                    if(this.products.param["addition"].indexOf(a) == -1)
                        this.products.param["addition"].push(a);


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
    isEmpty(i){
        console.log('isEmpty');

        this.products.item.push({
            radius: this.items[i].radius,
            diameter: this.items[i].diameter,
            addition: null,
            axis: null,
            cylinder: null,
            sphere: this.items[i].sphere,
            condition: "30",
            stock: 0,
            provider: false
        });
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
        if(this.products.ownerPrice.length > 1)
            this.products.ownerPrice.pop();
    }

    console(i){
        console.log(i);
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
