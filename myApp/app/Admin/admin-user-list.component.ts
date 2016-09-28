import {Component, forwardRef, Inject} from 'angular2/core';
import {FormBuilder, Validators} from "angular2/common";
import {RegEx} from "../lib/regex";
import {AdminFactory} from "./admin.factory";
import {Admin} from "./admin";
import {ControlGroup} from "angular2/common";
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {AlertService} from "../Tools/alert";
import {UserFactory} from "../User/user.factory";


@Component({
    templateUrl: "app/Admin/admin-user-list.html"
})

export class AdminUserListComponent {

    users = [] ;
    isOpen = [];
    
    constructor(public service: UserFactory){
        this.service.getUsers()
            .subscribe(
                res => {
                    if(res.success){
                        this.users = res.data;
                        for(var index in this.users){
                            this.isOpen.push(false);
                            for (var i = 0; i < this.users[index].associateShop.length; i++) {
                                for (var j = 0; j < this.users[index].associateShop[i].disponibility.length; j++) {
                                    this.users[index].associateShop[i].disponibility[j].data.morning.opening = new Date(this.users[index].associateShop[i].disponibility[j].data.morning.opening);
                                    this.users[index].associateShop[i].disponibility[j].data.morning.closing = new Date(this.users[index].associateShop[i].disponibility[j].data.morning.closing);
                                    this.users[index].associateShop[i].disponibility[j].data.afternoon.opening = new Date(this.users[index].associateShop[i].disponibility[j].data.afternoon.opening);
                                    this.users[index].associateShop[i].disponibility[j].data.afternoon.closing = new Date(this.users[index].associateShop[i].disponibility[j].data.afternoon.closing);
                                }
                            }
                        }
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get user list Complete')
            );
    }

}
