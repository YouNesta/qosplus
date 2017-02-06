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
        var data = JSON.stringify({
            mail: {
                type: 'validateUser',
                data: {
                    to: user.mail,
                    object: 'X-Vision - Confirmation d\'Inscription'
                },
                date: new Date()
            }
            }
        );

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
                    console.log(response);
                    return response
                }else{
                    console.log("Error")
                }
                return response;
            })
    };

    addAdmin(user){
        var data = JSON.stringify({
            mail: {
                type: 'addAdmin',
                data: {
                    to: user.mail,
                    object: 'X-Vision - Confirmation d\'Inscription Employé'
                },
                date: new Date()
            }
            }
        );

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
                    console.log(response);
                    return response
                }else{
                    console.log("Error")
                }
                return response;
            })
    };

    changePassword(mail, password){
        console.log('dfjkghftherjkthhh')
        console.log(mail);
        var data = JSON.stringify({
                mail: {
                    type: 'changePassword',
                    data: {
                        to: mail,
                        object: 'X-Vision - Confirmation de changement de mots de passe',
                        variables: password
                    },
                    date: new Date()
                }
            }
        );

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

    sendMails(){
        return this.authHttp
            .get(this.apiUrl + "send")
            .map((response) => response.json())
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