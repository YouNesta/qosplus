
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {API} from "../Config/api";


@Injectable()

export class AdminFactory {
    apiUrl = String;

    constructor(public authHttp: AuthHttp,  api: API) {
        this.apiUrl = api.url+api.admin;
    }

    save = function(admin) {

        var data =  JSON.stringify({admin});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

       return this.authHttp
            .post(this.apiUrl + 'subscribe',
                data, {
                    headers: headers
                })
            .map(response => response.json());


    };

    update = function(admin) {

        var data =  JSON.stringify({admin});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

       return this.authHttp
            .post(this.apiUrl + 'update',
                data, {
                    headers: headers
                })
            .map(response => response.json());


    };

    list(){
      return  this.authHttp
            .get(this.apiUrl+'')
            .map(response => response.json())
            .subscribe(
                response => console.log(response),
                err =>  console.log(err),
                () => console.log('Subscription Complete')
            );
    };

    getAdmins(){
        return  this.authHttp
            .get(this.apiUrl+'')
            .map(response => response.json())
    };

    deleteAdmin(user){
        var data =  JSON.stringify({mail: user.mail});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + 'delete',
                data, {
                    headers: headers
                })
            .map(response => response.json())
    };

    getUnvalidateUser(){
        return  this.authHttp
            .get(this.apiUrl+'unvalidate')
            .map(response => response.json())
    };

    validateUser = function(user) {

        var data =  JSON.stringify({user});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + 'validate',
                data, {
                    headers: headers
                })
            .map(response => response.json())
            .subscribe(
                response => console.log(response),
                err =>  console.log(err),
                () => console.log('Validation Complete')
            );
    };

    getAdmin(admin) {

        var data =  JSON.stringify({admin});

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + 'getAdmin',
                data, {
                    headers: headers
                })
            .map(response => response.json());
    };
}