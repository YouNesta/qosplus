import {Component} from 'angular2/core';
import {ProductFactory} from "../../Product/product.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ProductAddCartComponent} from "../../Product/product-add-cart.component";
import {TagInputComponent} from "angular2-tag-input";
import {UserFactory} from "../user.factory";


@Component({
    providers: [ProductFactory],
    templateUrl: "app/User/Product/products-list.html",
    directives: [ MODAL_DIRECTIVES, ProductAddCartComponent]
})

export class UserProductsListComponent {
    products: Object ;
    productCart: String;
    isOpen = [];
    user = {};
    type = 0;

    constructor(public service: ProductFactory, public userService: UserFactory){

        var user = JSON.parse(localStorage.getItem("user"));

        userService.getUserById(user._id)
            .subscribe(
                response => {
                    if(response.success){
                        this.user = response.data;
                        this.type = this.user.type.type;
                        this.getProducts();
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('user get')
            );
    }

    loadModalProduct(product, modal) {
        modal.open();
        this.productCart = JSON.stringify(product);
    }

    getProducts(){
        this.service.getProduct()
            .subscribe(
                response => {
                    if(response.success){
                        this.products = response.data;
                        for(var i in this.products){
                            this.isOpen.push(false);
                            if (this.user.role == 0) {
                                this.products[i].price = [this.products[i].price[this.type]];
                            }
                        }
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('get product list Complete')
            );
    }
}

