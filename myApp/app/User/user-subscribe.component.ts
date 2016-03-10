import {Component} from 'angular2/core';
import {User} from "./user";
import {UserFactory} from "./user.factory";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
    providers: [],
    templateUrl: "app/User/user-subscribe.html",
    directives: [MATERIAL_DIRECTIVES]
})

export class UserSubscribeComponent {
    user = User;
    service: UserFactory ;
    constructor(userFactory: UserFactory){
        this.service = userFactory
    }

    subscribe(){
        this.user = new User(this.user.id + 1, this.user.firstname, this.user.lastname);
        this.service.save(this.user);

    }
}

