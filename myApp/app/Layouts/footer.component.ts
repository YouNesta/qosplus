import {Component} from 'angular2/core';
import {App} from "../main";
import {NavComponent} from "./nav.component";



@Component({
    selector: "footer",
    templateUrl: "app/Layouts/footer.html",
})

export class FooterComponent {
    title: string;
    constructor(){
    }
}

