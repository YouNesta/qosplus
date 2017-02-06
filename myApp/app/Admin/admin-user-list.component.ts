import {Component, forwardRef, Inject} from 'angular2/core';
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {CanActivate} from "angular2/router";
import {UserFactory} from "../User/user.factory";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {ProductFactory} from "../Product/product.factory";
import {MailManager} from "../lib/mail-manager";


@Component({
    templateUrl: "app/Admin/admin-user-list.html",
    directives : [MODAL_DIRECTIVES],
    bindings: [MailManager]
})

export class AdminUserListComponent {

    users = [] ;
    isOpen = [];
    defaultModel = {
        "_id":"",
        "state":0,
        "role":1,
        "type":{},
        "lastName":"",
        "firstName":"",
        "phone":"",
        "mail":"",
        "averageLens":0,
        "providerLens":"",
        "averageGlasses":0,
        "providerGlasses":"",
        "IBAN":"",
        "BIC":"",
        "financialMail":"",
        "paymentState":true,
        "central":"",
        "type": {
            "__v": 0,
            "type": 0,
            "name": "",
            "_id": ""
        },
        "associateShop":[
            {
                "name":"",
                "socialReason":"",
                "adress":"",
                "adress2":"",
                "city":"",
                "zipCode":0,
                "mobile":"",
                "phone":"",
                "fax":"",
                "mail":"",
                "tva":0,
                "siret":0,
                "adeli":0,
                "nightBox":true,
                "transporteur":"",
                "disponibility": [],
            }
        ],
        "director":{
            "state":0,
            "role":1,
            "lastName":"",
            "firstName":"",
            "phone":"",
            "mail":"",
            "averageLens":0,
            "providerLens":"",
            "averageGlasses":0,
            "providerGlasses":"",
            "IBAN":0,
            "BIC":0,
            "financialMail":"",
            "paymentState":true,
            "central":"",
            "__v":0,
            "associateShop":[
                ""
            ],
            "director":[
                ""
            ]
        },
        "isCollapsed":false
    };
    model = {};
    userType: {};
    currentType = 0;
    mailService: MailManager;


    constructor(public service: UserFactory, public productService: ProductFactory, @Inject(forwardRef(() => MailManager)) mailService){
        this.model = this.defaultModel;
        this.mailService = mailService
        this.getUsers();

        this.productService.countProductPrice()
            .subscribe(
                response => {
                    if(response.success){
                        this.userType = response.data;
                    }
                },
                err => {
                },
                () => console.log('Authentification')
            );

    }
    modifyUser(i){
        this.model = this.users[i];
        this.currentType = this.users[i].type.type
    }
    closed(){
        this.getUsers();
        this.model = this.defaultModel;
    }
    updateUser(){

            if(this.userType[this.currentType] != 'undefined'){
                this.model.type = this.userType[this.currentType-1];
            }else{
                this.model.type = this.model.type;
            }

        this.service.updateUser( this.model)
            .subscribe(
                response => {
                    if(response.success){

                    }else{
                    }
                },
                err => {
                },
                () => {this.getUsers()}
            );
    }
    getUsers(){
        this.service.getUsers()
            .subscribe(
                res => {
                    if(res.success){
                        this.users = res.data;
                        for(var index in this.users){
                            this.isOpen.push(false);
                            for (var i = 0; i < this.users[index].associateShop.length; i++) {
                                for (var j = 0; j < this.users[index].associateShop[i].disponibility.length; j++) {
                                    this.users[index].associateShop[i].disponibility[j].data.morning.opening = new Date(this.users[index].associateShop[i].disponibility[j].data.morning.opening);
                                    this.users[index].associateShop[i].disponibility[j].data.morning.closing = new Date(this.users[index].associateShop[i].disponibility[j].data.morning.closing);
                                    this.users[index].associateShop[i].disponibility[j].data.afternoon.opening = new Date(this.users[index].associateShop[i].disponibility[j].data.afternoon.opening);
                                    this.users[index].associateShop[i].disponibility[j].data.afternoon.closing = new Date(this.users[index].associateShop[i].disponibility[j].data.afternoon.closing);
                                }
                            }
                        }
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get user list Complete')
            );
    }

    resetPassword(i){
        this.model = this.users[i];
        var user = JSON.stringify(this.model);
        this.service.userResetPwd(user)
            .subscribe(
                res => {
                    console.log('sdfkjhsdfjkhfds')
                    if(res.success){
                        this.mailService.changePassword(this.model.mail, res.data)
                            .subscribe(
                                res => {
                                    if(res.success){
                                    }
                                },
                                err => {
                                },
                                () => console.log('reset user password')
                            )
                        alert('Le mot de passe à été réinitialisé avec succès ! un email à été envoyé à l\'utilisateur')
                    }else{
                        console.log(res);
                    }
                },
                err => console.log(err),
                () => console.log('reset password')
            )
    }
}
