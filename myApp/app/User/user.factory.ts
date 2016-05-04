
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {Router} from "angular2/router";
import {API} from "../Config/api";

@Injectable()

export class UserFactory {
    http = null;
    apiUrl = String;
    constructor(public authHttp: AuthHttp, public router : Router, api: API) {
        this.apiUrl = api.url+api.user
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
    getMails(){
        return  this.authHttp
            .get(this.apiUrl+'getMails')
            .map(res => res.json())
    }


    login(user) {
        var data =  JSON.stringify({user});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(this.apiUrl);
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

    };

    login(user) {
        var data =  JSON.stringify({user});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(this.apiUrl);
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

    };



    updateUser(user) {
        var data =  JSON.stringify({user});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .put(this.apiUrl + "",
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


    };

    getProfile(user){
        var data =  JSON.stringify({user});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + "profile",
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
    };

    getUserCommands(user){
        var data = JSON.stringify({user});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + "commands",
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
    };

    getUserCommands(user){
        var data = JSON.stringify({user});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.authHttp
            .post(this.apiUrl + "payments",
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
    };
}