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
                        console.log(res.data);
                        for(var i in this.users){
                            this.isOpen.push(false);
                            getShopInfos(i);
                        }
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get user list Complete')
            );

        function getShopInfos(index){
            var thus = this;
            if(index < this.users.length) {
                thus.service.getShops(this.users[index].associateShop)
                    .subscribe(
                        res => {
                            if (res.success) {
                                console.log(res.data);
                                thus.users[index].associateShop = res.data;
                                for (var i = 0; i < thus.users[index].associateShop.length; i++) {
                                    for (var j = 0; j < thus.users[index].associateShop[i].disponibility.length; j++) {
                                        thus.users[index].associateShop[i].disponibility[j].data.morning.opening = new Date(thus.users[index].associateShop[i].disponibility[j].data.morning.opening);
                                        thus.users[index].associateShop[i].disponibility[j].data.morning.closing = new Date(thus.users[index].associateShop[i].disponibility[j].data.morning.closing);
                                        thus.users[index].associateShop[i].disponibility[j].data.afternoon.opening = new Date(thus.users[index].associateShop[i].disponibility[j].data.afternoon.opening);
                                        thus.users[index].associateShop[i].disponibility[j].data.afternoon.closing = new Date(thus.users[index].associateShop[i].disponibility[j].data.afternoon.closing);
                                    }
                                }
                                getShopInfos(index);
                            } else {
                                console.log(res.message);
                            }
                        },
                        err => {
                            console.log("error");
                        },
                        () => console.log('get User Shop complete')
                    );
            }
        }
    }

}
