
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {Router} from "angular2/router";

@Injectable()

export class ProductFactory {
    http = null;
    apiUrl = "http://192.168.33.10:8080/api/v1/product/";
    constructor(public authHttp: AuthHttp, public router : Router) {


    }

    save(product){
        var data =  JSON.stringify({product});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.authHttp
            .post(this.apiUrl + 'add',
                data, {
                    headers: headers
                })
            .map(response => response.json())
            .subscribe(
                response => console.log(response),
                err =>  console.log(err),
                () => console.log('Product Added')
            );
    }

    getProduct(){
        return  this.authHttp
            .get(this.apiUrl+'list')
            .map(response => response.json())
    }
}