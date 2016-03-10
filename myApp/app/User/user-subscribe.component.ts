import {Component} from 'angular2/core';
import {User} from "./user";
import {UserFactory} from "./user.factory";

@Component({
    templateUrl: "app/User/user-subscribe.html"
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

