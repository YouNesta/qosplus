import {Component} from 'angular2/core';
import {App} from "../main";
import {NavComponent} from "./nav.component";



@Component({
    selector: "header",
    templateUrl: "app/Layouts/header.html",
    directives: [NavComponent]
})

export class HeaderComponent {
    title: string;
    constructor(){
         this.title = "QosPlus";
    }
}

