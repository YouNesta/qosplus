import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";



@Component({
    selector: "nav",
    template: "<li><a [routerLink]=\"['Home']\">Home</a></li>" +
    "<li><a [routerLink]=\"['Users', 'Login']\">Se connecter</a></li>" +
    "<li><a [routerLink]=\"['Users', 'Subscribe']\">S'inscrire</a></li>",
    directives: [ROUTER_DIRECTIVES]
})

export class NavComponent {

}

