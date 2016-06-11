
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

    constructor(public authHttp:AuthHttp, public router:Router, api:API) {
        this.apiUrl = api.url + api.product;
        this.uploadUrl = api.url + api.upload + api.product;
        this.commandUrl = api.url + api.command;

    }

    deleteProducts(products) {
        var data = JSON.stringify({products});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + 'deletes',
                data, {
                    headers: headers
                })
            .map(response => response.json())
    }

    deleteCommand(command) {
        var data = JSON.stringify({command});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.commandUrl + 'deleteCommand',
                data, {
                    headers: headers
                })
            .map(response => response.json())
    }

    save(products) {
        var data = JSON.stringify({products});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + 'add',
                data, {
                    headers: headers
                })
            .map(response => response.json())

    }

    getProduct() {
        return this.authHttp
            .get(this.apiUrl + 'list')
            .map(response => response.json())
    }

    getPrice() {
        return this.authHttp
            .get(this.apiUrl + 'price/list')
            .map(response => response.json())
    }

    countProductPrice() {
        return this.authHttp
            .get(this.apiUrl + 'price/count')
            .map(response => response.json())
    }

    getCommands() {
        return this.authHttp
            .get(this.commandUrl + 'list')
            .map(res => res.json())
    }

    getPayments() {
        return this.authHttp
            .get(this.commandUrl + 'paymentList')
            .map(res => res.json())
    }


    updatePrice(product) {
        var data = JSON.stringify({product});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + 'price/update',
                data, {
                    headers: headers
                })
            .map(response => response.json())

    }

    editProduct(product) {
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

    getOneProduct(productId) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.authHttp
            .get(this.apiUrl + 'product/' + productId,
                {
                    headers: headers
                })
            .map(response => response.json())
            .map(response => {
                if (response) {
                    return response
                } else {
                    console.log("Error")
                }
                return response;
            })
    }

    getProductsById(productIds) {
        var data = JSON.stringify({productIds});

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + 'getProductsById',
                data, {
                    headers: headers
                })
            .map(response => response.json());
    }

    getOneCommand(commandId) {

        var data = JSON.stringify({commandId});

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.commandUrl + 'command/' + commandId,
                data, {
                    headers: headers
                })
            .map(response => response.json());
    }


    createPrice(price) {
        var data = JSON.stringify({price});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + 'price/create',
                data, {
                    headers: headers
                })
            .map(response => response.json())

    }


    createCommand(client, amount, shop) {
        var cart = JSON.parse(localStorage.getItem("cart"));

        var command = {
            date: new Date(),
            client: client.mail,
            product: cart,
            status: 1,
            shop: shop
        };

        var payment = {
            date: new Date(),
            IBAN: client.IBAN,
            status: 0,
            client: client.mail,
            amount: amount
        };

        var data = JSON.stringify({command, payment});

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.commandUrl + 'create',
                data, {
                    headers: headers
                })
            .map(response => response.json())
    }

    deleteProduct(product) {
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

    printPdf(command) {
        var data = JSON.stringify({command});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.commandUrl + 'printPdf',
                data, {
                    headers: headers
                })
            .map(response => response.json())
    }

    printFacture(payment) {
        var data = JSON.stringify({payment});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.commandUrl + 'printFacture',
                data, {
                    headers: headers
                })
            .map(response => response.json())
    }

    changePaymentStatus(id) {
        var data = JSON.stringify({id});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.commandUrl + 'changePaymentStatus',
                data, {
                    headers: headers
                })
            .map(response => response.json())
    }

    changeCommandStatus(id) {
        var data = JSON.stringify({id});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.commandUrl + 'changeCommandStatus',
                data, {
                    headers: headers
                })

    }

    getProductBySupplier(){
        return  this.authHttp
            .get(this.apiUrl+'list/supplier/asc')
            .map(response => response.json())
    }
}