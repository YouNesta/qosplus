import {Component} from 'angular2/core';


import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
@CanActivate(() => tokenNotExpired('token'))

@Component({
    templateUrl: "app/User/user-dashboard.html",
})



export class UserDashboardComponent {

}

