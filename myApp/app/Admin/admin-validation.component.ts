import {Component, forwardRef, Inject} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
} from 'angular2/router';
import {AdminSubscribeComponent} from "./admin-subscribe.component";
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
import {AdminFactory} from "./admin.factory";
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {FormValidator} from "../Config/form-validator";
import {MODAL_DIRECTIVES, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {UserFactory} from "../User/user.factory";
import {AlertService} from "../Tools/alert";

@CanActivate(() => tokenNotExpired('token'))


@Component({
    templateUrl: "admin-validation.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES]
})



export class AdminValidationComponent {
    model = {
        "_id":"",
        "state":0,
        "role":1,
        "lastName":"fdvcx ",
        "firstName":"efvdscxw erzdcxw",
        "phone":"06.59.90.12.05",
        "mail":"younes.boulkaddid@supinternet.fr",
        "averageLens":234567,
        "providerLens":"Aflelou",
        "averageGlasses":234567,
        "providerGlasses":"Aflelou",
        "IBAN":98765434567890,
        "BIC":987654567890,
        "financialMail":"younes.boulkaddid@supinternet.fr",
        "paymentState":true,
        "central":"Central datatatata",
        "__v":0,
        "associateShop":[
            {
                "_id":"56f4824e403261d408b07cfa",
                "name":"Younesta",
                "socialReason":"YOUNESTA SARL",
                "adress":"43 rue de malabry",
                "adress2":"",
                "city":"Maisse",
                "zipCode":91720,
                "mobile":"06 50 90 12 05",
                "phone":"01 60 78 37 94",
                "fax":"01 60 78 37 94",
                "mail":"younes.boulkaddid@supinternet.fr",
                "tva":0.9,
                "siret":987654567890987,
                "adeli":876545678987654,
                "nightBox":true,
                "transporteur":"Mathieu",
                "openDay":"Lun",
                "closeDay":"Lun",
                "openHour":"10:30",
                "closeHour":"10:11",
                "__v":0
            }
        ],
        "director":{
            "_id":"56f4824e403261d408b07cf9",
            "state":0,
            "role":1,
            "lastName":"fdvcx ",
            "firstName":"efvdscxw erzdcxw",
            "phone":"06.59.90.12.05",
            "mail":"younes.boulkaddid@supinternet.fr",
            "averageLens":234567,
            "providerLens":"Aflelou",
            "averageGlasses":234567,
            "providerGlasses":"Aflelou",
            "IBAN":98765434567890,
            "BIC":987654567890,
            "financialMail":"younes.boulkaddid@supinternet.fr",
            "paymentState":true,
            "central":"Central datatatata",
            "__v":0,
            "associateShop":[
                "56f4824e403261d408b07cfa"
            ],
            "director":[
                "56f4824e403261d408b07cf9"
            ]
        },
        "isCollapsed":false
    };
    validateForm: ControlGroup;
    modal: ModalComponent;
    alertService: AlertService;
    users: Array<Object>;

    constructor(public adminService: AdminFactory, public service: UserFactory, fb: FormBuilder, formValidator: FormValidator, @Inject(forwardRef(() => AlertService)) alertService){
       this.alertService = alertService;
        this.adminService.getUnvalidateUser()
           .subscribe(
               response => {
                   if(response.success){
                       this.users = response.data;
                       var $this = this;
                       response.data.forEach(function(item, i){
                           try
                           {
                               var director = JSON.parse( $this.users[i].director);
                               $this.users[i].director = director;

                           }
                           catch(e)
                           {
                               $this.users[i].director = $this.users[i].director;

                           }
                           $this.users[i].isCollapsed = true;
                       });

                   }else{
                       console.log(response);
                   }
               },
               err =>  {
                   alertService.addAlert('danger', 500);
               },
               () => console.log('get user list Complete')
            );

        this.validateForm = fb.group({
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
            ])]
        });
    }

    modifyUser(i){
        this.model = this.users[i];
    }
    validateUser(){
        this.service.updateUser(this.model)
            .subscribe(
                res => {
                    if(res.success){
                        this.alertService.addAlert('success', res.message);
                    }else{
                        this.alertService.addAlert('warning', res.message);
                    }
                },
                err => {
                    this.alertService.addAlert('danger', 500);
                },
                () => console.log('Authentification')
            );
        
    }

}

