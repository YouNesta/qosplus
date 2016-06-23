import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {UserFactory} from "../User/user.factory";
import {Router} from "angular2/router";



@Component({
    selector: "nav-admin",
    templateUrl: "app/Layouts/nav-admin.html",
    directives: [ROUTER_DIRECTIVES]
})

export class NavAdminComponent  {
    public title = "X-vision";

    constructor(public router: Router){
    }

}

