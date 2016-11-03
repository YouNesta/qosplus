import {Component, forwardRef, Inject} from 'angular2/core';
import {FormBuilder, Validators} from "angular2/common";
import {RegEx} from "../lib/regex";
import {AdminFactory} from "./admin.factory";
import {Admin} from "./admin";
import {ControlGroup} from "angular2/common";
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {AlertService} from "../Tools/alert";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";

@CanActivate(() => tokenNotExpired('token'))

@Component({
    templateUrl: "app/Admin/admin-subscribe.html",
    directives: [MODAL_DIRECTIVES]
})

export class AdminSubscribeComponent {
    service: AdminFactory ;
    admin: Admin;
    subscribeForm: ControlGroup;
    alertService: AlertService;
    admins = [];

    model = {
        lastName: 'Boulkaddid',
        firstName: 'Younes',
        phone: '06.59.90.12.05',
        mail: 'younes.boulkaddid@supinternet.fr',
        password: '12345678',
        passwordCheck: '12345678',
    };
    errors = [];
    constructor(fb: FormBuilder, regEx: RegEx, adminFactory: AdminFactory, @Inject(forwardRef(() => AlertService)) alertService){
        this.alertService = alertService;
        this.service = adminFactory;
        this.getAdmins();
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
               /* Validators.required,
                Validators.maxLength(30)*/
            ])],
            'firstName': ['', Validators.compose([
               /* Validators.required,
                Validators.maxLength(30)*/
            ])],
            'mail': ['', Validators.compose([
               /*
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(100)*/
            ])],
            'phone': ['', Validators.compose([
            ])],
            'mobile': ['', Validators.compose([
            ])],
            'password': ['', Validators.compose([
            ])],
            'passwordCheck': ['', Validators.compose([
            ])]
        });
    }
    getAdmins(){
        this.service.getAdmins()
            .subscribe(
                res =>{
                    if(res.success){
                        this.admins = res.data;
                        console.log(res)
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('Subscription Complete')
            );

    }

    subscribe(modal){

        this.errors = []

        if (this.model.lastName == "") {this.errors.push("Le champ Nom ne peut être vide");}
        if (this.model.firstName == "") {this.errors.push("Le champ Prénom ne peut être vide");}
        if (this.model.phone == "") {this.errors.push("Le champ Téléphone ne peut être vide");}
        if (this.model.mail == "") {this.errors.push("Le champ E-mail ne peut être vide");}
        if (this.model.password != this.model.passwordCheck) {this.errors.push("Les passwords ne correspondent pas.");}
        else if(this.model.password == ""){this.errors.push("Le champ Password ne peut être vide")}

        if(this.errors.length == 0){
            this.service.save(this.model)
                .subscribe(
                    response => {
                        if(response.success){
                            this.alertService.addAlert('success', response.message);
                            modal.close();
                        }else{
                            if(response.message == 'Subscribe failed. User Already exist.'){
                                this.errors.push('Cette utilisateur est déjà enregistré.');
                            }else{
                                this.errors.push('Une erreur est survenu veuillez réessayer.')
                            }
                        }
                    },
                    err =>  {
                        this.alertService.addAlert('warning', 500);
                    },
                    () => console.log('Subscription Complete')
                );
        }
    }
    close(){
        this.getAdmins();
        this.model = {
            lastName: '',
            firstName: '',
            phone: '',
            mail: '',
            password: '',
            passwordCheck: '',
        };
    }

    deleteAdmin(user){
        this.service.deleteAdmin(user)
            .subscribe(
                response => {
                    if(response.success){
                        this.getAdmins()
                    }else{
                       this.errors.push('Une erreur est survenu veuillez réessayer.')

                    }
                },
                err =>  console.log(err),
                () => console.log('Validation Complete')
            );
    }
}

