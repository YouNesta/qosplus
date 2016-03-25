import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {OnInit} from "angular2/core";
import {UserFactory} from "../User/user.factory";
import {Input} from "angular2/core";



@Component({
    selector: "nav-admin",
    template: "<li><a [routerLink]=\"['Home', 'Homepage']\">Home</a></li>",
    directives: [ROUTER_DIRECTIVES]
})

export class NavAdminComponent  {
    @Input() connected: boolean;
    @Input() admin: number;

    constructor(public service: UserFactory){
    }

}

