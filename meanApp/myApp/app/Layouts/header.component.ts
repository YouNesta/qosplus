import {Component} from 'angular2/core';
import {App} from "../main";
import {NavComponent} from "./nav.component";



@Component({
    selector: "header",
    template:   "<h1>{{title}}</h1>" +
                "<nav></nav>",
    directives: [NavComponent]
})

export class HeaderComponent {
    title: string;
    constructor(){
         this.title = "QosPlus";
    }
}

