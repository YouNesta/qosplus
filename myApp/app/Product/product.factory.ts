
import {Injectable} from 'angular2/core';
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {AuthHttp} from 'angular2-jwt';
import {Router} from "angular2/router";
import {API} from "../Config/api";

@Injectable()

export class ProductFactory {
    http = null;
    apiUrl = "";
    uploadUrl = "";
    commandUrl = "";
    constructor(public authHttp: AuthHttp, public router : Router, api : API) {
        this.apiUrl = api.url+api.product;
        this.uploadUrl = api.url+api.upload+api.product;
        this.commandUrl = api.url+api.command;

    }

    save(products){
        var data =  JSON.stringify({products});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

      return  this.authHttp
            .post(this.apiUrl + 'add',
                data, {
                    headers: headers
                })
            .map(response => response.json())

    }

    getProduct(){
        return  this.authHttp
            .get(this.apiUrl+'list')
            .map(response => response.json())
    }
    getPrice(){
        return  this.authHttp
            .get(this.apiUrl+'price/list')
            .map(response => response.json())
    }
    countProductPrice(){
        return  this.authHttp
            .get(this.apiUrl+'price/count')
            .map(response => response.json())
    }
    getCommand(){
    return  this.authHttp
        .get(this.commandUrl+'list')
        .map(res => res.json())
    }


    updatePrice(product){
        var data =  JSON.stringify({product});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return  this.authHttp
            .post(this.apiUrl + 'price/update',
                data, {
                    headers: headers
                })
                .map(response => response.json())

    }

    editProduct(product){
        var data = JSON.stringify({product});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .put(this.apiUrl + 'edit',
                data, {
                    headers: headers
                })
                .map(response => response.json())

        }



    getOneProduct(product){
        var data =  JSON.stringify({product});
        var headers = new Headers();
            headers.append('Content-Type', 'application/json');

            return this.authHttp
                .post(this.apiUrl + 'login',
                    data, {
                        headers: headers
                    })
                .map(response => response.json())
                .map(response => {
                    if (response) {
                        return response
                    }else{
                        console.log("Error")
                    }
                    return response;
                })
        }


        createPrice(price){
            var data =  JSON.stringify({price});
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');

            return  this.authHttp
                .post(this.apiUrl + 'price/create',
                    data, {
                        headers: headers
                    })
                .map(response => response.json())

        }


    createCommand(){
        var cart = JSON.parse(localStorage.getItem("cart"));
        var user = JSON.parse(localStorage.getItem("user"));
        var price = 150;

        for(var i=0; i < cart.length; i++) {
            //price += cart[i].price;
        }

        console.log(cart);

        var command = {
            date: new Date(),
            client: user._id,
            product: cart,
            status: 1,
        };

        var payment = {
            date: new Date(),
            IBAN: 12345678,
            status: 0,
            client: user._id,
            amount: price
        };

        var data =  JSON.stringify({command, payment});

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.commandUrl + 'create',
                data, {
                    headers: headers
                })
            .map(response => response.json())
    }

    deleteProduct(product){
        var data = JSON.stringify({product});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + 'delete',
                data, {
                    headers: headers
                })
            .map(response => response.json())
    }
}