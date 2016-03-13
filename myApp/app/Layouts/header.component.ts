import {Component} from 'angular2/core';
import {App} from "../main";
import {NavUserComponent} from "./nav-user.component";
import {Router} from "angular2/router";
import {RouteAuth} from "../Config/route-auth";



@Component({
    selector: "header",
    templateUrl: "app/Layouts/header.html",
    directives: [NavUserComponent]
})

export class HeaderComponent {
    title: string;
    routeAuth= '';


    constructor(private router: Router, routeAuth: RouteAuth){
        this.title = "QosPlus";
        router.subscribe((val) => {
            this.routeAuth =  routeAuth.routeAuth(val);
        });


    }

}

