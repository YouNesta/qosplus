import {Component, forwardRef, Inject, Input, ElementRef} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {UserFactory} from "./../User/user.factory";
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
    templateUrl: "app/Product/product-cart.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES]

})

export class ProductCartComponent {

    products = [];
    alertService: AlertService;
    user = Object;
    shopMobiles = [];
    shopPhones = [];
    shopRS = [];
    shopNames = [];
    isOpen = [];
    client: {};
    selectedProductCard = [];
    shops = Object;
    selectedShop = {};
    price = 0;
    priceType = 0;
    productPrice = [];

    public query = '';
    public filteredList = [];
    public elementRef;

    constructor(public service: ProductFactory, @Inject(forwardRef(() => AlertService)) alertService, public userService: UserFactory, myElement: ElementRef){

        this.elementRef = myElement;
        this.alertService = alertService;
        this.user = JSON.parse(localStorage.getItem("user"));
        if (this.user.role == 1) {
            userService.getAllShops()
                .subscribe(
                    res => {
                        if(res.success){
                            this.shops = res.data;
                            for (var i in this.shops) {
                                var shop = this.shops[i];
                                this.shopMobiles.push(shop.mobile);
                                this.shopPhones.push(shop.phone);
                                this.shopRS.push(shop.socialReason);
                                this.shopNames.push(shop.name);
                            }
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
        if (this.client != null) {
            this.service.createCommand(this.client, this.price)
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

        for (var i in this.productPrice) {
            var product = this.productPrice[i];
            var productPrice = parseInt(product.price[this.priceType].price);
            var quantity = 0;

            for (var i in this.products) {
                var myProduct = this.products[i];

                if (myProduct._id == product._id) {
                    quantity = myProduct.quantity;
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
    filter() {
        if (this.query !== ""){
            this.filteredList = this.shopMobiles.filter(function(el){
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
            var phones = (this.shopPhones.filter(function(el){
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this)));
            var rs = (this.shopRS.filter(function(el){
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this)));
            var names = (this.shopNames.filter(function(el){
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this)));
            if (phones != null) {
                for (var i = 0; i < phones.length; i++) {
                    this.filteredList.push(phones[i]);
                }
            }
            if (rs != null) {
                for (var i = 0; i < rs.length; i++) {
                    this.filteredList.push(rs[i]);
                }
            }
            if (names != null) {
                for (var i = 0; i < names.length; i++) {
                    this.filteredList.push(names[i]);
                }
            }
        }else{
            this.filteredList = [];
        }
    }
    select(item){
        this.query = item;
        this.filteredList = [];
    }
    handleClick(event){
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if(!inside){
            this.selectShop();
            this.filteredList = [];
        }
    }
    selectShop() {
        var type = "";
        if (this.shopMobiles.indexOf(this.query) != -1) type = "mobile";
        if (this.shopPhones.indexOf(this.query) != -1) type = "phone";
        if (this.shopRS.indexOf(this.query) != -1) type = "rs";
        if (this.shopNames.indexOf(this.query) != -1) type = "name";

        switch (type) {
            case "mobile":
                for (var i in this.shops) {
                    var shop = this.shops[i];
                    if (shop.mobile == this.query) this.selectedShop = shop;
                }
                break;
            case "phone":
                for (var i in this.shops) {
                    var shop = this.shops[i];
                    if (shop.phone == this.query) this.selectedShop = shop;
                }
                break;
            case "rs":
                for (var i in this.shops) {
                    var shop = this.shops[i];
                    if (shop.socialReason == this.query) this.selectedShop = shop;
                }
                break;
            case "name":
                for (var i in this.shops) {
                    var shop = this.shops[i];
                    if (shop.name == this.query) this.selectedShop = shop;
                }
                break;
            default:
                console.log('not found');
        }

        this.userService.getUserById(this.selectedShop.owner)
            .subscribe(
                res => {
                    if(res.success){
                        this.client = res.data;
                        if (this.client) {
                            this.priceType = this.client.type.type;
                        }
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get mail list Complete')
            );
    }
}