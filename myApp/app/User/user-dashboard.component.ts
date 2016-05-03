import {Component} from 'angular2/core';
import {UserFactory} from "./user.factory";
import {ProductFactory} from "../Product/product.factory"
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
@CanActivate(() => tokenNotExpired('token'))

@Component({
    providers: [],
    templateUrl: "app/User/user-dashboard.html",
    directives: [ ACCORDION_DIRECTIVES ]
})



export class UserDashboardComponent {
    user : Object;

    constructor(public service: UserFactory){
        this.service.getProfile(localStorage.getItem('user'))
            .subscribe(
                res => {
                    if(res.success){
                        this.user = res.data;
                        console.log(this.user)
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get command list Complete')
            );

        this.service.getUserCommands(localStorage.getItem('user'))
            .subscribe(
                res => {
                    if(res.success){
                        this.user = res.data;
                        console.log(this.user)
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get command list Complete')
            );
    }
}

