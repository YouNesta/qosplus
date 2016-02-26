import {Component} from 'angular2/core';
import {User} from "./user";
import {UserFactory} from "./user.factory";



@Component({
    templateUrl: "app/User/user-subscribe.html"
})

export class UserSubscribeComponent {
    user = new User(1,'Younes','Nesta');

    subscribe(public http: UserFactory){
        console.log(this.user);
        this.user = new User(this.user.id + 1, this.user.firstname, this.user.lastname);
        console.log(this.user);
        this.http.save(this.user);
            // Subscribe to the observable to get the parsed people object and attach it to the
            // component


    }
}

