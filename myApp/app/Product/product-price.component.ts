import {Component, forwardRef, Inject, ViewChild} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {AlertService} from "../Tools/alert";
import {MODAL_DIRECTIVES, ModalComponent} from "ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";


@Component({
    selector: "product-price",
    templateUrl: "app/Product/product-price.html",
    directives: [ACCORDION_DIRECTIVES, MODAL_DIRECTIVES]
})


export class ProductPriceComponent {
    @ViewChild('modalAdd')
    modalAdd: ModalComponent;

    alertService: AlertService;
    subscribeForm: ControlGroup;
    products: Array<Object>;
    tableHead = [];
    product = [];
    errors = [];
    modelAdd = {
        name: '',
        type: 0,
        products: []
    };


    constructor(public service: ProductFactory, fb: FormBuilder, @Inject(forwardRef(() => AlertService)) alertService){
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
                /* Validators.required,
                 Validators.maxLength(30)*/
            ])],
        });

        this.alertService = alertService;
        this.getPrice();
    }

    getPrice(){
        this.service.getPrice()
            .subscribe(
                response => {
                    if(response.success){
                        this.products = [];
                        this.tableHead = [];
                        this.products = response.data;
                        if(this.products.length > 0){
                            for(var i in this.products[0].price){
                                this.tableHead.push(this.products[0].price[i].name);
                            }
                        }
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => ""
    );
    }

     editPrice(modal, product){
         modal.open();
         this.product = product;
    }
    updatePrice(){
        this.service.updatePrice(this.product)
            .subscribe(
                response => {
                    if(response.success){

                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => this.getPrice()
    );

    }

    createPrice(modal){
        this.errors = []
        if(this.modelAdd.name == ""){this.errors.push('Veuillez entrer un nom de tarif')}
        var lastPriceIndex = this.modelAdd.products[0].price.length - 1;

        var priceNull = false;
        for(var i in this.modelAdd.products){
            if(this.modelAdd.products[i].price[lastPriceIndex].price <= 0){priceNull = true;}
        }

        if(priceNull){this.errors.push("Vous ne pouvez pas renseigner le prix d'un produit à 0")}
        console.log(priceNull);

        if(this.errors.length == 0){
            this.service.createPrice(this.modelAdd)
                .subscribe(
                    response => {
                        if(response.success){
                            modal.close();
                        }else{
                            console.log(response);
                        }
                    },
                    err =>  console.log(err),
                    () => this.getPrice()
                );
        }

    }

    dismiss(){
        for(var i in this.modelAdd.products){
            this.modelAdd.products[i].price.pop()
        }
        this.modalAdd.dismiss();
    }
    addPrice(modal){
        modal.open();
        this.service.countProductPrice()
            .subscribe(
                response => {
                    if(response.success){
                      this.modelAdd.type = response.data.length + 1;
                        this.modelAdd.products = this.products;
                        for(var i in this.modelAdd.products){
                            this.modelAdd.products[i].price.push({name:'', price: 0, type:this.modelAdd.type})
                        }

                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('update product price Complete')
            );

    }


}
