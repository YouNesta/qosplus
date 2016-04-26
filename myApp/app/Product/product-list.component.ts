import {Component} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {ProductAddComponent} from "./product-add.component";

@Component({
    providers: [],
    templateUrl: "app/Product/product-list.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES, ProductAddComponent]

})

export class ProductListComponent {

    products: Array<Object>;

    constructor(public service: ProductFactory){
        this.service.getProduct()
            .subscribe(
                response => {
                    if(response.success){
                        this.products = response.data;
                        console.log(this.products)
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('get product list Complete')
            );
    }

    //Edit and Delete should only take one product as argument
    editProduct(product){
        this.service.editProduct(product)
            .subscribe(
                response => {
                    if(response.success){
                        console.log("Product successfully updated");
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('Product successfully updated')
            )
    }

    deleteProduct(product){
        this.service.deleteProduct(product)
            .subscribe(
                response => {
                    if(response.success){
                        console.log("Product successfully deleted");
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('Product successfully deleted')
            )
    }
}