import {Component} from 'angular2/core';
import {User} from "./user";



@Component({
    templateUrl: "app/User/user-subscribe.html"
})

export class UserSubscribeComponent {
    model = new User(1,'Younes','Nesta');

    subscribe(){
        this.model = new User(this.model.id + 1, this.model.firstname, this.model.lastname);
        console.log(this.model);

    }
}

