import {Component} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {AdminSubscribeComponent} from "./admin-subscribe.component";
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {AdminFactory} from "./admin.factory";
@CanActivate(() => tokenNotExpired('token'))


@Component({
    templateUrl: "app/Admin/admin-validation.html",
})



export class AdminValidationComponent {
    users: any;

    constructor(public service: AdminFactory){
       this.service.getUnvalidateUser()
           .subscribe(
           response => {
               if(response.success){
                   this.users = response.data;
                   console.log(response.data);
               }else{
                   console.log(response);
               }
           },
           err =>  console.log(err),
           () => console.log('get user list Complete')
       );
    }

}

