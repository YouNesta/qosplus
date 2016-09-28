import {Component} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ProductAddComponent} from "./product-add.component";
import {ProductEditComponent} from "./product-edit.component";
import {ProductAddCartComponent} from "./product-add-cart.component";
import {ProductEditComponent} from "./product-edit.component";

@Component({
    providers: [],
    templateUrl: "app/Product/product-list.html",
    directives: [ MODAL_DIRECTIVES, ProductAddComponent, ProductAddCartComponent, ProductEditComponent]

})

export class ProductListComponent {

    products: Object ;
    productCart: String;
    isOpen = [];
    selectedProduct = [];
    spheres = {};
    sphereIndexes = [];

    constructor(public service: ProductFactory){
        this.getProducts();
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
                        console.log(this.products);
                        for(var i in this.products){
                            this.isOpen.push(false);
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

    deleteProducts(){

        for(var i=0; i< this.selectedProduct.length; i++)
        {
            this.selectedProduct[i] = this.products[this.selectedProduct[i]]._id;
        }
        console.log(this.selectedProduct);
        if(confirm('Etes vous sur de vouloir supprimer ces produits ?')){
            this.service.deleteProducts( this.selectedProduct)
                .subscribe(
                    response => {
                        if(response.success){
                            this.selectedProduct=[];
                            this.getProducts();
                        }else{
                            console.log(response);
                        }
                    },
                    err =>  console.log(err),
                    () => console.log('get product list Complete')
                );
        }
    }

    selectProduct(index)
    {
        this.selectedProduct.indexOf(index);

        var n = this.selectedProduct.indexOf(index);
        if( n != -1){
            this.selectedProduct.splice(n, 1);
        }else{
            this.selectedProduct.push(index);
        }
    }

    /*
     * 0 => paid
     * 1 => unvalidate
     * 2 => waiting for payment
     * */

    changeStatus(i) {

        var products = this.products;
        var service = this.service;

        setTimeout(function() {
            var product = products[i];
            product = service.changeProductStatus(product._id, product.status).subscribe(
                res => {
                    if(res.success){
                        //nothing
                    } else {
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('product updated')
            );
        }, 100);
    }

    close(){
        this.getProducts();
    }

    duplicateProduct(product){

        product.item.forEach(function(i, index){
            product.item[index] = i._id;
        });


        if(confirm("Etes vous sur de vouloir dupliquer ce produit ?")){
            this.service.duplicateProduct(product)
                .subscribe(
                    response => {
                        if(response.success){
                            console.log("Product successfully duplicated");
                            this.getProducts();
                        }else{
                            console.log(response);
                        }
                    },
                    err =>  console.log(err),
                    () => console.log('Product successfully updated')
                )
        }
    }
}