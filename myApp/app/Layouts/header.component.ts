import {Component, Input, OnChanges} from 'angular2/core';
import {App} from "../main";
import {NavUserComponent} from "./nav-user.component";
import {NavAdminComponent} from "./nav-admin.component";
import {Router} from "angular2/router";
import {RouteAuth} from "../Config/route-auth";
import {SimpleChange} from "angular2/core";



@Component({
    selector: "header",
    templateUrl: "app/Layouts/header.html",
    directives: [NavUserComponent, NavAdminComponent]
})

export class HeaderComponent implements OnChanges{
    title: string;
    routeAuth= '';
    role: number;
    @Input() connected: boolean;
    @Input() admin: number;

    constructor(private router: Router, routeAuth: RouteAuth){
        this.title = "QosPlus";
        router.subscribe((val) => {
            this.routeAuth =  routeAuth.routeAuth(val);
            console.log( this.routeAuth);
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

