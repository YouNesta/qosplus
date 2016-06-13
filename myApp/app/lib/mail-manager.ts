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
        var data = JSON.stringify({mail: {
            type: 'validateUser',
            data: {
                to: user.mail,
                object: 'X-Vision - Confirmation d\'Inscription'
            },
            date: new Date()
        }});

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(this.apiUrl);
        return this.authHttp
            .post(this.apiUrl + "add",
                data, {
                    headers: headers
                })
            .map(response => response.json())
            .map(response => {
                if (response) {
                    console.log(response);
                    return response
                }else{
                    console.log('testFail');
                    console.log("Error")
                }
                console.log('fail');
                return response;
            })
    }
}