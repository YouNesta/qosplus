import {Component, forwardRef, Inject} from 'angular2/core';
import {User} from "./user";
import {FormBuilder, Validators} from "angular2/common";
import {RegEx} from "../lib/regex";
import {UserFactory} from "./user.factory";
import {ControlGroup} from "angular2/common";
import {Router} from "angular2/router";
import {AlertService} from "../Tools/alert";


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
    alertService: AlertService;

    constructor(fb: FormBuilder, regEx: RegEx, public service: UserFactory, public router: Router, @Inject(forwardRef(() => AlertService)) alertService){
        this.alertService = alertService;
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
                .subscribe(
                    res => {
                        if(res.success){
                            var user = JSON.stringify(res.data);
                            localStorage.setItem("user", user);
                            localStorage.setItem('token',res.token);
                            this.alertService.addAlert('success', 'Vous vous êtes connecté avec succés');
                            if(res.data.role > 0){
                                this.router.navigateByUrl('/admin');
                            }else if(res.data.role == 0){
                                this.router.navigateByUrl('/user');
                            }
                        }else{
                            this.alertService.addAlert('warning', res.message);
                        }
                    },
                    err => {
                        this.alertService.addAlert('danger', 500)
                    },
                    () => console.log('Authentification')
                );

        }
    }
}
