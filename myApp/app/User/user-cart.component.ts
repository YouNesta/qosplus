import {Component, forwardRef, Inject, Input, ElementRef} from 'angular2/core';
import {ProductFactory} from "./../Product/product.factory";
import {UserFactory} from "./user.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {AlertService} from "../Tools/alert";

@Component({
    selector: 'autocomplete',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    providers: [],
    templateUrl: "app/User/user-cart.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES]

})

export class UserCartComponent {

    products = [];
    alertService: AlertService;
    user = Object;
    isOpen = [];
    client: {};
    selectedProductCard = [];
    shops = Object;
    selectedShop = {};
    price = 0;
    priceType = 0;
    productPrice = [];
    porter = "";
    no_porter = false;
    no_shop = false;
    spheres = {};
    sphereIndexes = [];

    public query = '';
    public filteredList = [];
    public elementRef;

    constructor(public service: ProductFactory, @Inject(forwardRef(() => AlertService)) alertService, public userService: UserFactory, myElement: ElementRef){

        this.elementRef = myElement;
        this.alertService = alertService;
        this.user = JSON.parse(localStorage.getItem("user"));
        userService.getUserShops(this.user)
            .subscribe(
                res => {
                    if(res.success){
                        this.shops = res.data[0];
                        this.client = this.shops[0].owner;
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get mail list Complete')
            );
        this.getCart();
    }
    getCart(){
        this.products = JSON.parse(localStorage.getItem("cart"));

        if(this.products){
            if (this.products.length > 0) {

                for(var i in this.products){
                    this.isOpen.push(false);
                }

                var productsId = [];

                for (var i in this.products) {
                    productsId.push(this.products[i]._id);
                }


                this.service.getProductsById(productsId).subscribe(
                    res => {
                        if(res.success){
                            console.log(res.data);this.productPrice = res.data;
                            console.log(res.data);

                        }else{
                            this.alertService.addAlert('warning', res.message);
                        }
                    },
                    err => {
                        this.alertService.addAlert('danger', 500);
                    },
                    () => console.log('Prices get')
                );
            }
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

        if (this.client == null) {
            this.no_shop = true;
            return;
        } else {
            this.no_shop = false;
        }

        if (this.porter == "") {
            this.no_porter = true;
            return;
        } else {
            this.no_porter = false;
        }

        var rightEye = false;
        var leftEye = false;
        var isCommandLegit = true;
        for (var i in this.products) {
            if (this.products[i].eye == "droit" ) rightEye = true;
            if (this.products[i].eye == "gauche" ) leftEye = true;
        }

        if (rightEye == false || leftEye == false) {
            isCommandLegit = confirm("Attention, vous n'avez des lentilles que pour un oeil, valider ?");
        }

        if (this.client != null && this.products.length > 0 && isCommandLegit == true) {
            this.service.createCommand(this.client, this.price, this.selectedShop, this.porter)
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
                );
        }

    }

    getPrice() {

        var price = 0;

        for (var i in this.products) {
            var product = this.products[i];
            var productPrice = 0;
            var quantity = product.quantity;

            for (var j in this.productPrice) {
                var myProduct = this.productPrice[j];

                if (myProduct._id == product._id) {
                    productPrice = parseInt(myProduct.price[this.priceType].price);
                    this.products[i].actualPrice = productPrice;
                }
            }

            price += (productPrice * quantity);
        }

        this.price = price;
        return price;
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