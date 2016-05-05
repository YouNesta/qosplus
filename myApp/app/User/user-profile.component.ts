import {Component, forwardRef, Inject} from 'angular2/core';
import {User} from "./user";
import {FormBuilder, Validators} from "angular2/common";
import {RegEx} from "../lib/regex";
import {UserFactory} from "./user.factory";
import {ControlGroup} from "angular2/common";
import {Router} from "angular2/router";


@Component({
    templateUrl: "app/User/user-profile.html",
    providers: [UserFactory]
})

export class UserProfileComponent {

    user = {
        lastName: 'Loscil',
        firstName: 'Medru',
        phone: '06.59.90.12.05',
        mail: 'younes.boulkaddid@supinternet.fr',
        IBAN: '12345678',
        BIC: '1234578',
    };

    constructor(public service: UserFactory, public router: Router){
        var user = JSON.parse(localStorage.getItem("user"));
        //this.user = service.getUserById(user._id);
    }
}
