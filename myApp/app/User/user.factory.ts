
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {Router} from "angular2/router";

@Injectable()

export class UserFactory {
    http = null;
    apiUrl = "http://192.168.33.10:8080/api/v1/client/user/";
    constructor(public authHttp: AuthHttp, public router : Router) {


    }

    save(user, shops, director, option){
      var data =  JSON.stringify({user, shops, director, option});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.authHttp
            .post(this.apiUrl + 'subscribe',
                data, {
                    headers: headers
                })
            .map(response => response.json())
            .subscribe(
                response => console.log(response),
                err =>  console.log(err),
                () => console.log('Authentication Complete')
            );
    }

    user(){

        if(localStorage.getItem('user')){
            return JSON.parse(localStorage.getItem('user'))
        }else {
            this.getUser()
                .subscribe(res => {
                        return JSON.parse(localStorage.getItem('user'))
                    },
                    err => console.log(err));
        }


    }
    getUser(){
        return this.authHttp
            .get(this.apiUrl+ 'get')
            .map( (response) => response.json())
            .map(response => {
                if (response) {
                    var user = JSON.stringify(response.data);
                    localStorage.setItem("user", user)
                    return response
                }else{
                    console.log("Error")
                }
                return response;
            })
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigateByUrl('/');
    }

    isConnected(){
        var token = localStorage.getItem('token')
        if(token != 'undefined'){
            return  token
        }
        return false;
    }
    isAdmin(){
        if(localStorage.getItem('user')){
            var user = localStorage.getItem('user')
            user = JSON.parse(user);
            return user.role
        }
        return 0;
    }


    login = function(user) {
        var data =  JSON.stringify({user});
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
            .subscribe(
                res => {
                    if(res.success){
                        var user = JSON.stringify(res.data);
                        localStorage.setItem("user", user);
                        localStorage.setItem('token',res.token);
                        if(res.data.role > 0){
                            this.router.navigateByUrl('/admin');
                        }else{
                            console.log(345678);
                            this.router.navigateByUrl('/user');
                        }
                    }else{
                    }
                },
                err => {
                    console.log(err);
                },
                () => console.log('Authentification')
            );

    };
}