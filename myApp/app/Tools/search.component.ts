import {Component, Output,EventEmitter} from 'angular2/core';
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {CORE_DIRECTIVES} from 'angular2/common';
import {UserFactory} from "../User/user.factory";



@Component({
    selector: "search",
    templateUrl: "app/Tools/search.html",
    directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES]
})

export class SearchComponent  {
    theme = "produit";
    user = [];
    private disabled:boolean = false;
    private status:{isopen:boolean} = {isopen: false};
    @Output() alert = new EventEmitter();

    constructor(public service: UserFactory){
        this.user = this.service.user();
    }

    private toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

     logout(event){
        event.preventDefault();
         this.service.logout()
    }
}

