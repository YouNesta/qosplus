import {Component, Input, forwardRef, Inject, NgZone} from 'angular2/core';
import {Product} from "./product";
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {AlertService} from "../Tools/alert";


@Component({
    selector: "product-edit",
    templateUrl: "app/Product/product-edit.html",
    directives: []
})


export class ProductEditComponent {
    @Input() modal;
    @Input() productCart;

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

    constructor(public service: ProductFactory,  @Inject(forwardRef(() => AlertService)) alertService){
        this.alertService = alertService;
    }

    removeItem(i) {
        var reference = this.items[i].reference;
        var _id = this.items[i]._id;
        this.service.deleteItem(_id, reference)
                    .subscribe(
                        response => {
                            if(response.success){
                                console.log("Item successfully deleted");
                                this.items.splice(i, 1);
                            }else{
                                console.log(response);
                            }
                        },
                        err =>  console.log(err),
                        () => console.log('Product successfully deleted')
                    )

    }

    ngOnChanges(changes: {[productCart: string]: SimpleChange}) {


            if(changes['productCart']){
                if (typeof changes['productCart'].currentValue !== "undefined" && changes['productCart'].currentValue !== "undefined") {
                    this.product = JSON.parse(changes['productCart'].currentValue);

                    this.items = [];

                    for (var i in this.product.item) {
                        var item = this.product.item[i];
                        for (var j in item.sphere) {

                            var sphere = {
                                _id: item._id,
                                 radius: item.radius,
                                 diameter: item.diameter,
                                 addition: item.addition,
                                 axis: item.axis,
                                 cylinder: item.cylinder,
                                 sphere: item.sphere[j].sphere,
                                 reference: item.sphere[j].reference
                            };

                            this.items.push(sphere);
                        }
                    }
                }
            }
        }

}
