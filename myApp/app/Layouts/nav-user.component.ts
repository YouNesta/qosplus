import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {OnInit} from "angular2/core";



@Component({
    selector: "nav-user",
    template: "<li><a [routerLink]=\"['Home', 'Homepage']\">Home</a></li>" +
    "<li><a [routerLink]=\"['Home', 'About']\">À propos de nous</a></li>" +
    "<li><a [routerLink]=\"['Home', 'Products']\">Nos Produits</a></li>" +
    "<li><a [routerLink]=\"['Home', 'Contact']\">Contact</a></li>" +
    "<li><a [routerLink]=\"['User', 'Login']\">Se connecter</a></li>" +
    "<li><a [routerLink]=\"['User', 'Subscribe']\">S'inscrire</a></li>",
    directives: [ROUTER_DIRECTIVES]
})

export class NavUserComponent  implements OnInit {



}

