import {Component, forwardRef, Inject} from 'angular2/core';
import {User} from "../User/user";
import {FormBuilder, Validators} from "angular2/common";
import {RegEx} from "../lib/regex";
import {UserFactory} from "../User/user.factory";
import {ControlGroup} from "angular2/common";
import {Router} from "angular2/router";
import {AlertService} from "../Tools/alert";
import {MODAL_DIRECTIVES} from "../../jspm_packages/npm/ng2-bs3-modal@0.5.1/ng2-bs3-modal";
import {MailManager} from "../lib/mail-manager";


@Component({
    templateUrl: "app/Home/home-login.html",
    directives: [MODAL_DIRECTIVES],
    providers: [RegEx, UserFactory, AlertService],
    bindings: [MailManager]
})

export class HomeLoginComponent {
    loginForm: ControlGroup;
    forgottenPasswordForm: ControlGroup;

    model = {
        lastName: '',
        firstName: '',
        phone: '',
        mail: '',
        password: ''
    };

    modelForgotten = {
        mail: ''
    };

    alertService: AlertService;
    errors = [];
    mailService: MailManager;

    constructor(fb: FormBuilder, regEx: RegEx, public service: UserFactory, public router: Router, @Inject(forwardRef(() => AlertService)) alertService, @Inject(forwardRef(() => MailManager)) mailService){
        this.alertService = alertService;
        this.mailService = mailService
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
        this.forgottenPasswordForm = fb.group({
            'mail': ['', Validators.compose([])]
        });
    }

    login(){
        if(this.loginForm.valid){
            this.service.login(this.model)
                .subscribe(
                    res => {
                        if(res.success){
                            console.log(res)

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
                            this.errors = []
                            this.errors.push('Mauvais login ou mot de passe, veuillez ressayer. Si le problème persiste, contactez le service client.');
                        }
                    },
                    err => {
                        this.alertService.addAlert('danger', 500)
                    },
                    () => console.log('Authentification')
                );

        }
    }

    subscribe(modal){
        this.errors = [];
        console.log(this.modelForgotten);
        if(this.modelForgotten.mail == "") { this.errors.push("Veuillez remplir le champ") }

        if(this.errors.length == 0){
            this.service.getUserByMail(this.modelForgotten.mail)
                .subscribe(
                    res => {
                        if (res.success){
                            var user = JSON.stringify(res.data);
                            this.service.userResetPwd(user)
                                .subscribe(
                                    res => {
                                        if(res.success){
                                            this.mailService.changePassword(this.model, res.data);
                                            this.alertService.addAlert('success', 'Votre mot de passe à été réinitialisé, vous recevrez un mail avec votre nouveau mot de passe bientot.')
                                        }
                                    },
                                    err => {
                                        this.alertService.addAlert('danger', 500)
                                    },
                                    () => console.log('reset user password')
                                )
                        }
                    },
                    err => {
                        this.alertService.addAlert('warning', "cette utilisateur n'existe pas.")
                    },
                    () => console.log('get User password')
                )
        }
    }




}
