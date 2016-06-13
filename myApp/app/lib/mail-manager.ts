

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {Router} from "angular2/router";
import {API} from "../Config/api";

@Injectable()
export class MailManager{
    http = null;
    apiUrl = String;
    constructor(public authHttp: AuthHttp, public router : Router, api: API){
        this.apiUrl = api.url+api.mail;
    }

    validateUser(user){
        console.log('testmanager');
        var data = JSON.stringify({
            type: 'validateUser',
            data: {
                to: user.mail,
                object: 'X-Vision - Confirmation d\'Inscription'
            },
            date: new Date()
        });
        console.log('test1');
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + "add",
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

}