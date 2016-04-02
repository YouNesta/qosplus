import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {OnInit} from "angular2/core";
import {UserFactory} from "../User/user.factory";
import {Input} from "angular2/core";
import {Router} from "angular2/router";



@Component({
    selector: "nav-admin",
    templateUrl: "app/Layouts/nav-admin.html",
    directives: [ROUTER_DIRECTIVES]
})

export class NavAdminComponent  {


    constructor(public service: UserFactory, public router: Router){
        this.title = "QosPlus";
    }

}

