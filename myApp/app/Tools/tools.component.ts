import {Component} from 'angular2/core';
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {CORE_DIRECTIVES} from 'angular2/common';
import {UserFactory} from "../User/user.factory";



@Component({
    selector: "tools",
    templateUrl: "app/Tools/tools.html",
    directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES]
})

export class ToolsComponent  {
    theme = "produit";
    user = [];
    private disabled:boolean = false;
    private status:{isopen:boolean} = {isopen: false};

    constructor(public service: UserFactory){
        this.user = this.service.user();
    }

    private toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }
}

