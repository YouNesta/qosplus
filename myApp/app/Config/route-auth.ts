
import {Injectable} from 'angular2/core';
import {UserFactory} from "../User/user.factory";
import {tokenNotExpired} from "angular2-jwt";
import {Router} from "angular2/router";

@Injectable()

export class RouteAuth {
    location = {
        base: '',
        name: ' ',
        auth: false
    };

constructor(public service: UserFactory, public router: Router) {
    this.route = {
        " ": [
            { "route": "/", "auth": false },
            { "route": "contact", "auth": false },
            { "route": "about", "auth": false },
        ],

        "admin": [
            { "route": "/", "auth": true },
            { "route": "subscribe", "auth": true },
        ],

        "user": [
            { "route": "/", "auth": false },
            { "route": "subscribe", "auth": false },
            { "route": "login", "auth": false },
        ],

        "products": [
            { "route": "/list", "auth": false },
            { "route": "/add", "auth": false },
        ],
    }


    }
     routeAuth(val){
    this.location.base = " ";
    this.location.name = "/";
    if(val.indexOf("/") != -1 && val != ""){
        var base = val.split("/");
        this.location.base = base[0];
        this.location.name = base[1]
    }else if(val.indexOf("/") == 0){
        var base = val.split("/");
        this.location.name = base[1]
    }else{
        this.location.base = val;

    }

    var $this = this ;

    if( val.indexOf("/") > 0){
console.log(this.location);
        this.route[this.location.base].forEach(function(item, e) {
            if($this.location.name == item.route){
                $this.location.auth = item.auth
            }
        });

    }else if( val.indexOf("/") == -1 && this.location.base != "") {
        this.route[this.location.base].forEach(function(item, e) {
            if($this.location.name == item.route){
                $this.location.auth = item.auth
            }
        });
    }else{
        this.route[" "].forEach(function (item, e) {

            if($this.location.name == item.route){
                $this.location.auth = item.auth
            }
        });

    }
         return this.location;
}

    redirect(){
        if(this.service.isConnected() && tokenNotExpired('token')){
            var user = this.service.user();
            console.log(user);
            if(user.role > 0){
                this.router.navigateByUrl('/admin');
            }else{
                console.log(345678);
                this.router.navigateByUrl('/user');
            }
        }
    }

}