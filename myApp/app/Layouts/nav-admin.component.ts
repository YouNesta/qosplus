import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {OnInit} from "angular2/core";
import {UserFactory} from "../User/user.factory";
import {Input} from "angular2/core";



@Component({
    selector: "nav-admin",
    template: "<li><a [routerLink]=\"['Admin', 'Subscribe']\">Ajouter un Employé</a></li>"+
    "<li><a [routerLink]=\"['Admin', 'Validation']\">Valider un utilisateur</a></li>"+
    "<button class='btn btn-primary' (click)='service.logout()' type='button'>Logout</button>",
    directives: [ROUTER_DIRECTIVES]
})

export class NavAdminComponent  {


    constructor(public service: UserFactory){
    }

}

