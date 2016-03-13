import {Component} from 'angular2/core';
import {App} from "../main";
import {NavUserComponent} from "./nav-user.component";
import {Router} from "angular2/router";
import {RouteAuth} from "../Config/route-auth";
import forEachChild = ts.forEachChild;



@Component({
    selector: "header",
    templateUrl: "app/Layouts/header.html",
    directives: [NavUserComponent]
})

export class HeaderComponent {
    title: string;
    location = {
        base: '',
        name: ' ',
        auth: false
    };


    constructor(private router: Router, routeAuth: RouteAuth){
        this.title = "QosPlus";
        router.subscribe((val) => {

            this.location.base = " ";
            this.location.name = "/";
            if(val.indexOf("/") != -1 && val != ""){
                var base = val.split("/");
                this.location.base = base[0];
                this.location.name = base[1]
            }else if(val.indexOf("/") == 0){
                var base = val.split("/");
                this.location.name = base[1]
            }

            var $this = this ;

            if( val.indexOf("/") > 0){
                routeAuth.route[this.location.base].forEach(function(item, e) {
                    if($this.location.name == item.route){
                        $this.location.auth = item.auth
                    }
                });

                }else if( val.indexOf("/") == -1) {
                routeAuth.route[this.location.base].forEach(function(item, e) {
                    if($this.location.name == item.route){
                        $this.location.auth = item.auth
                    }
                });
            }else{
                routeAuth.route[" "].forEach(function (item, e) {

                    if($this.location.name == item.route){
                        $this.location.auth = item.auth
                        }
                    });

                }

            });


    }

}

