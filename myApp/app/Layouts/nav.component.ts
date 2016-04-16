import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";



@Component({
    selector: "nav",
<<<<<<< HEAD
    template:
    "<li><a [routerLink]=\"['User', 'Login']\">Inscription / Connexion</a></li>" +
    "<li><a [routerLink]=\"['Home', 'Products']\">Nos Produits</a></li>" +
    "<li><a [routerLink]=\"['Home', 'Contact']\">Nos Engagements</a></li>" +
    "<li><a [routerLink]=\"['Home', 'About']\">Qui sommes nous ?</a></li>" +
    "<li><a [routerLink]=\"['Home', 'Homepage']\">Accueil</a></li>",
=======
    template: "<li><a [routerLink]=\"['Home', 'Homepage']\">Home</a></li>" +
    "<li><a [routerLink]=\"['Home', 'About']\">À propos de nous</a></li>" +
/*
    "<li><a [routerLink]=\"['Product', 'List']\">Nos Produits</a></li>" +
*/
    "<li><a [routerLink]=\"['Home', 'Contact']\">Contact</a></li>" +
    "<li><a [routerLink]=\"['User', 'Login']\">Se connecter</a></li>" +
    "<li><a [routerLink]=\"['User', 'Subscribe']\">S'inscrire</a></li>",
>>>>>>> origin/dev
    directives: [ROUTER_DIRECTIVES]
})

export class NavComponent  {
}

