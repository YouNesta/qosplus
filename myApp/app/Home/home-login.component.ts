import {Component, forwardRef, Inject} from 'angular2/core';
import {FormBuilder, Validators} from "angular2/common";
import {UserFactory} from "../User/user.factory";
import {ControlGroup} from "angular2/common";
import {Router} from "angular2/router";
import {MODAL_DIRECTIVES} from "../../jspm_packages/npm/ng2-bs3-modal@0.5.1/ng2-bs3-modal";
import {MailManager} from "../lib/mail-manager";


@Component({
    templateUrl: "app/Home/home-login.html",
    providers: [UserFactory],
    directives: [MODAL_DIRECTIVES],
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

    errors = [];
    resetAlert = [];
    mailService: MailManager;

    constructor(fb: FormBuilder,  public service: UserFactory, public router: Router, @Inject(forwardRef(() => MailManager)) mailService){
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
                    },
                    () => console.log('Authentification')
                )

        }
    }

    subscribe(modal){
        this.resetAlert = [];
        if(this.modelForgotten.mail == "") { this.resetAlert.push("Veuillez remplir le champ") }

        if(this.resetAlert.length == 0){
            this.service.getUserByMail(this.modelForgotten.mail)
                .subscribe(
                    res => {
                        if (res.success){
                            var user = JSON.stringify(res.data);
                            this.service.userResetPwd(user)
                                .subscribe(
                                    res => {
                                        console.log(res);
                                        if(res.success){
                                            this.mailService.changePassword(this.modelForgotten.mail, res.data)
                                        .subscribe(
                                                res => {
                                                    if(res.success){
                                                        this.model.mail = this.modelForgotten.mail;
                                                        modal.close();
                                                    }
                                                    this.resetAlert.push("Un mail vous a été envoyé sur l'adresse e-mail renseigné");
                                                },
                                                err => {
                                                },
                                                () => console.log('reset user password')
                                            )
                                        }
                                    },
                                    err => {
                                    },
                                    () => console.log('reset user password')
                                )
                        }
                    },
                    err => {
                    },
                    () => console.log('get User password')
                )
        }
    }




}
