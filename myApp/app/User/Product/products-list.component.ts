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
    selectedProduct = [];
    spheres = {};
    sphereIndexes = [];

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
        this.service.getActiveProduct()
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
                        for (var i in this.products) {
                            this.spheres[i] = [];
                            this.sphereIndexes[i] = [];
                            for (var j in this.products[i].item) {
                                for (var k in this.products[i].item[j].sphere) {
                                    var isNegative = false;
                                    var sphere = this.products[i].item[j].sphere[k].sphere;
                                    if (sphere < 0) {
                                        isNegative = true;
                                        sphere *= -1;
                                    }
                                    var floor = Math.floor(sphere);
                                    var index = floor.toString();
                                    if (isNegative) {
                                        index = "-"+index;
                                        sphere *= -1;
                                    }
                                    if (this.spheres[i][index] == null) this.spheres[i][index] = [];
                                    if (this.spheres[i][index].indexOf(sphere) == -1) {
                                        this.spheres[i][index].push(sphere);
                                        this.sphereIndexes[i] = Object.keys(this.spheres[i]);
                                    }
                                }
                            }
                            this.sphereIndexes[i].sort();
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

