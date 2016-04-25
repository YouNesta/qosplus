import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import {App} from "../main";
import {NavComponent} from "./nav.component";
import {NavAdminComponent} from "./nav-admin.component";
import {Router} from "angular2/router";
import {RouteAuth} from "../Config/route-auth";
import {NavUserComponent} from "./nav-user.component";



@Component({
    selector: "header",
    templateUrl: "app/Layouts/header.html",
    directives: [NavComponent, NavAdminComponent, NavUserComponent]
})

export class HeaderComponent implements OnChanges{
    title: string;
    routeAuth= '';
    role: number;
    @Input() connected: boolean;
    @Input() admin: number;

    constructor(private router: Router, routeAuth: RouteAuth){
        router.subscribe((val) => {
            this.routeAuth =  routeAuth.routeAuth(val);
        });
    }

    ngOnChanges(changes: {[connected: string]: SimpleChange}) {
        if(changes['admin']){
            this.admin =  changes['admin'].currentValue;
        }
        if(changes['connected']) {
            this.connected =  changes['connected'].currentValue;

        }
    }

}

