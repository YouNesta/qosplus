import {Component, forwardRef, Inject, Input, ElementRef} from 'angular2/core';
import {ProductFactory} from "./../Product/product.factory";
import {UserFactory} from "./user.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {Router} from "angular2/router";
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
                        this.productPrice = res.data;

                        this.service.checkStock().subscribe(
                            res => {
                                if(res.success){
                                    var result = res.data;

                                    for (var i in this.products) {
                                        for (var j in result) {
                                            if (result[j][1] == this.products[i].item._id) {
                                                if (result[j][2] == 0) {
                                                    this.products[i].state = "livraison 4-7j";
                                                } else {
                                                    this.products[i].state = "livraison 4-7j";
                                                }
                                            } else {
                                                this.products[i].state = "livraison 2-4j";
                                            }
                                        }
                                    }

                                }else{
                                    this.alertService.addAlert('warning', res.message);
                                }
                            },
                            err => {
                                this.alertService.addAlert('danger', 500);
                            },
                            () => console.log('No stock problem')
                        );
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
        var stock = false;

        for (var i in this.products) {
            if (this.products[i].eye == "droit" ) rightEye = true;
            if (this.products[i].eye == "gauche" ) leftEye = true;
        }

        if (rightEye == false || leftEye == false) {
            isCommandLegit = confirm("Attention, vous n'avez des lentilles que pour un oeil, valider ?");
        }

        this.service.checkStock().subscribe(
            res => {
                if(res.success){
                    var result = res.data;

                    console.log(result);

                    if (result.length > 0) {
                        var products = "";

                        for (var i in result) {
                            products += "-" + result[i][0] + "\n";
                        }

                        for (var i in this.products) {
                            for (var j in result) {
                                if (result[j][1] == this.products[i].item._id) {
                                    if (result[j][2] == 0) {
                                        this.products[i].state = "livraison 4-7j";
                                    } else {
                                        this.products[i].state = "livraison 4-7j";
                                    }
                                } else {
                                    this.products[i].state = "livraison 2-4j";
                                }
                            }
                        }

                        stock = confirm("Attention, les articles suivants ne sont plus en stock, le temps de livraison peut donc être allongé: \n" + products);
                    } else {
                        stock = true;
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
                                        this.router.navigateByUrl('/user/commands');
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

                }else{
                    this.alertService.addAlert('warning', res.message);
                }
            },
            err => {
                this.alertService.addAlert('danger', 500);
            },
            () => console.log('No stock problem')
        );

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