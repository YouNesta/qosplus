import {Component} from 'angular2/core';
import {User} from "./user";
import {FormBuilder, Validators} from "angular2/common";
import {RegEx} from "../lib/regex";
import {UserFactory} from "./user.factory";
import {ControlGroup} from "angular2/common";
import {Router} from "angular2/router";


@Component({
    templateUrl: "app/User/user-login.html"
})

export class UserLoginComponent {
    loginForm: ControlGroup;

    model = {
        lastName: 'Boulkaddid',
        firstName: 'Younes',
        phone: '06.59.90.12.05',
        mail: 'younes.boulkaddid@supinternet.fr',
        password: '12345678'
    };

    constructor(fb: FormBuilder, regEx: RegEx, public userFactory: UserFactory, public router: Router){
        this.service = userFactory;
        this.loginForm = fb.group({
            'mail': ['', Validators.compose([
                /*
                 Validators.required,
                 Validators.minLength(10),
                 Validators.maxLength(100)*/
            ])],
            'password': ['', Validators.compose([
            ])]
        });
    }

    login(){
        if(this.loginForm.valid){
            this.service.login(this.model)

        }
    }
}
