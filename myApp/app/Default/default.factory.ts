
import {Injectable} from 'angular2/core';
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {AuthHttp} from 'angular2-jwt';
import {Router} from "angular2/router";
import {API} from "../Config/api";

@Injectable()

export class DefaultFactory {
    http = null;
    apiUrl = "";
    uploadUrl = "";
    constructor(public authHttp: AuthHttp, public router : Router, api : API) {
        this.apiUrl = api.url+api.product;
        this.uploadUrl = api.url+api.upload;
    }

    defaultPost(products){
        var data =  JSON.stringify({products});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

      return  this.authHttp
            .post(this.apiUrl,
                data, {
                    headers: headers
                })
            .map(response => response.json())

    }

    defaultGet(){
        return  this.authHttp
            .get(this.apiUrl+'list')
            .map(response => response.json())
    }
}