import {Component, forwardRef, Inject} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {AlertService} from "../Tools/alert";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";


@Component({
    selector: "product-price",
    templateUrl: "app/Product/product-price.html",
    directives: [ACCORDION_DIRECTIVES, MODAL_DIRECTIVES]
})


export class ProductPriceComponent {
    alertService: AlertService;
    subscribeForm: ControlGroup;
    products: Array<Object>;
    tableHead = [];
    model = {
        name: "",
        price: {

        }
}   ;
    constructor(public service: ProductFactory, fb: FormBuilder, @Inject(forwardRef(() => AlertService)) alertService){
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
                /* Validators.required,
                 Validators.maxLength(30)*/
            ])],
        });

        this.alertService = alertService;

        this.service.getPrice()
            .subscribe(
                response => {
                    if(response.success){
                        this.products = response.data;
                        for(var i in this.products[0].price){
                            this.tableHead.push(this.products[0].price[i].name);
                        }
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('get product price Complete')
            );
    }

}
