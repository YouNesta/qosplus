import {Component} from 'angular2/core';
import {RouteAuth} from "../Config/route-auth";
import {Router} from "angular2/router";



@Component({
    selector: "footer",
    templateUrl: "app/Layouts/footer.html",
})

export class FooterComponent {
    title: string;
    routeAuth = '';
    constructor(private router: Router, routeAuth: RouteAuth){
        router.subscribe((val) => {
            this.routeAuth =  routeAuth.routeAuth(val);
        });
    }
}

