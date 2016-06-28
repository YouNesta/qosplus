import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {AdminSubscribeComponent} from "./admin-subscribe.component";
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {UserFactory} from "../User/user.factory";
import {AdminFactory} from "./admin.factory";
@CanActivate(() => tokenNotExpired('token'))


@Component({
    templateUrl: "app/Admin/admin-dashboard.html",
})



export class AdminDashBoardComponent {

    user = {
        lastName: 'Loscil',
        firstName: 'Medru',
        phone: '06.59.90.12.05',
        mail: 'younes.boulkaddid@supinternet.fr',
        IBAN: '12345678',
        BIC: '1234578',
        associateShop: []
    };

    constructor(public service: AdminFactory, public router: Router){
        var user = JSON.parse(localStorage.getItem("user"));
        service.getAdmin(user._id).subscribe(
            res => {
                if(res.success){
                    console.log(res);
                    this.user = res.data;
                }else{
                    console.log(res.message);
                }
            },
            err => {
                console.log("error");
            }
        );
    }
}

