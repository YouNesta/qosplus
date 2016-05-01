import {Component, forwardRef, Inject, Input} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {AlertService} from "../Tools/alert";


@Component({
    providers: [],
    templateUrl: "app/Product/product-cart.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES]

})

export class ProductCartComponent {

    products: Object;
    alertService: AlertService;

    constructor(public service: ProductFactory, @Inject(forwardRef(() => AlertService)) alertService){
        this.alertService = alertService;
        this.products = JSON.parse(localStorage.getItem("cart"));
        console.log()
    }

    removeFromCart(index) {
        var cart = [];
        var local = JSON.parse(localStorage.getItem("cart"));
        if (local != null) {cart = local;}
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        this.alertService.addAlert('warning', "Product successfully deleted from the cart.");
    }

    validateCart() {
        this.service.createCommand()
            .subscribe(
            res => {
                if(res.success){
                    var cart = [];
                    localStorage.setItem("cart", JSON.stringify(cart));
                    this.alertService.addAlert('success', res.message);
                }else{
                    this.alertService.addAlert('warning', res.message);
                }
            },
            err => {
                this.alertService.addAlert('danger', 500);
            },
            () => console.log('Command Added')
        );;
    }

}