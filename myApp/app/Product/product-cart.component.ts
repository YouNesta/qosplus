import {Component, forwardRef, Inject, Input} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {UserFactory} from "./../User/user.factory";
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
    user = Object;
    mails = [];
    isOpen = [];
    client = "";
    selectedProductCard = [];
    constructor(public service: ProductFactory, @Inject(forwardRef(() => AlertService)) alertService, public userService: UserFactory){
        this.alertService = alertService;
        this.user = JSON.parse(localStorage.getItem("user"));
        this.client = this.user.mail;
        if (this.user.role == 1) {
            userService.getMails()
                .subscribe(
                    res => {
                        if(res.success){
                            this.mails = res.data;
                        }else{
                            console.log(res);
                        }
                    },
                    err =>  console.log(err),
                    () => console.log('get mail list Complete')
                );
        }
        this.getCart();
    }
    getCart(){
        this.products = JSON.parse(localStorage.getItem("cart"));
        for(var i in this.products){
            this.isOpen.push(false);
        }
    };
    removeFromCart(index) {
        var cart = [];
        var local = JSON.parse(localStorage.getItem("cart"));
        if (local != null) {cart = local;}
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        this.alertService.addAlert('warning', "Product successfully deleted from the cart.");
    }

    validateCart() {
        this.service.createCommand(this.client)
            .subscribe(
            res => {
                if(res.success){
                    var cart = [];
                    localStorage.setItem("cart", JSON.stringify(cart));
                    this.getCart();
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

    getPrice() {
        return 17345;
    }
    deleteProductsCard(){

        for(var i in this.selectedProductCard){
           this.removeFromCart(this.selectedProductCard[i]);
        }

        this.getCart();

    }
    selectProduct(index){
        var n = this.selectedProductCard.indexOf(index);
        if( n != -1){
            this.selectedProductCard.splice(n, 1);
        }else{
            this.selectedProductCard.push(index);
        }
    }
}