import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";



@Component({
    selector: "nav",
    template:
    "<li><a [routerLink]=\"['User', 'Login']\">Inscription / Connexion</a></li>" +
    "<li><a [routerLink]=\"['Home', 'Products']\">Nos Produits</a></li>" +
    "<li><a [routerLink]=\"['Home', 'Contact']\">Nos Engagements</a></li>" +
    "<li><a [routerLink]=\"['Home', 'About']\">Qui sommes nous ?</a></li>" +
    "<li><a [routerLink]=\"['Home', 'Homepage']\">Accueil</a></li>",
    directives: [ROUTER_DIRECTIVES]
})

export class NavComponent  {
}

