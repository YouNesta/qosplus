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
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap';
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup, CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {FormValidator} from "../Config/form-validator";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal";
import {UserFactory} from "../User/user.factory";
import {AlertService} from "../Tools/alert";
import {HomeSubscribeComponent} from "../Home/home-subscribe.component";
import {ProductFactory} from "../Product/product.factory";
import {MailManager} from "../lib/mail-manager";
import {Timepicker} from "ng2-bootstrap";
import {Pipe} from "../../jspm_packages/npm/angular2@2.0.0-beta.15/ts/src/core/metadata";
import {DatePipe} from "../../jspm_packages/npm/angular2@2.0.0-beta.15/src/common/pipes/date_pipe";

@CanActivate(() => tokenNotExpired('token'))


@Component({
    templateUrl: "app/Admin/admin-validation.html",
    directives: [ ACCORDION_DIRECTIVES, MODAL_DIRECTIVES, HomeSubscribeComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, Timepicker],
    providers: [ AdminFactory ],
    bindings: [MailManager]
})

export class AdminValidationComponent {
    public hstep:number = 1;
    public mstep:number = 1;
    public ismeridian:boolean = false;
    public hour:Array = [];
    public mytime:Date = new Date();

    public days = [
        { name: "Lundi" },
        { name: "Mardi" },
        { name: "Mercredi" },
        { name: "Jeudi" },
        { name: "Vendredi" },
        { name: "Samedi" },
        { name: "Dimanche" },
    ];
    public selectedDay = "Lundi";
    public timepickerDay = {
        day: "",
        data: {
            morning: {
                opening: new Date(),
                closing: new Date()
            },
            afternoon: {
                opening: new Date(),
                closing: new Date()
            }
        }
    };

    associateShop = [{
        name: "",
        socialReason: '',
        adress: "",
        adress2: "",
        city: "",
        zipCode: "",
        mobile: "",
        phone: "",
        fax: "",
        mail: "",
        tva: null,
        siret: null,
        adeli: null,
        nightBox: true,
        transporteur:'',
        disponibility: []

    }];

    model = {
        "_id":"",
        "state":0,
        "role":1,
        "type":{},
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
                disponibility: [],
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
    shops = [
        { "_id" : "56e9eb8076b8f3a707192676", "name" : "Younesta", "socialReason" : "YOUNESTA SARL", "adress" : "43 rue de malabry", "adress2" : "", "city" : "Maisse", "zipCode" : 91720, "mobile" : "06 50 90 12 05", "phone" : "01 60 78 37 94", "fax" : "01 60 78 37 94", "mail" : "younes.boulkaddid@supinternet.fr", "tva" : 0.9, "siret" : 987654567890987, "adeli" : 876545678987654, "nightBox" : true, "transporteur" : "Mathieu",
            disponibility: [{
                day: "Lundi",
                data: {
                    morning: {
                        opening: new Date(),
                        closing: new Date()
                    },
                    afternoon: {
                        opening: new Date(),
                        closing: new Date()
                    }
                }
            },
                {
                    day: "Mardi",
                    data: {
                        morning: {
                            opening: new Date(),
                            closing: new Date()
                        },
                        afternoon: {
                            opening: new Date(),
                            closing: new Date()
                        }
                    }
                },
                {
                    day: "Mercredi",
                    data: {
                        morning: {
                            opening: new Date(),
                            closing: new Date()
                        },
                        afternoon: {
                            opening: new Date(),
                            closing: new Date()
                        }
                    }
                },
                {
                    day: "Jeudi",
                    data: {
                        morning: {
                            opening: new Date(),
                            closing: new Date()
                        },
                        afternoon: {
                            opening: new Date(),
                            closing: new Date()
                        }
                    }
                },
                {
                    day: "Vendredi",
                    data: {
                        morning: {
                            opening: new Date(),
                            closing: new Date()
                        },
                        afternoon: {
                            opening: new Date(),
                            closing: new Date()
                        }
                    }
                }],
            "__v" : 0 },
        { "_id" : "56e9eb8076b8f3a707192678", "name" : "Younesta", "socialReason" : "YOUNESTA SARL", "adress" : "43 rue de malabry", "adress2" : "", "city" : "Maisse", "zipCode" : 91720, "mobile" : "06 50 90 12 05", "phone" : "01 60 78 37 94", "fax" : "01 60 78 37 94", "mail" : "younes.boulkaddid@supinternet.fr", "tva" : 0.9, "siret" : 987654567890987, "adeli" : 876545678987654, "nightBox" : true, "transporteur" : "Mathieu", "openDay" : "Lun", "closeDay" : "Lun", "openHour" : "1970-01-01T00:00:00Z", "closeHour" : "1970-01-01T00:00:00Z", disponibility: [{
            day: "Lundi",
            data: {
                morning: {
                    opening: new Date(),
                    closing: new Date()
                },
                afternoon: {
                    opening: new Date(),
                    closing: new Date()
                }
            }
        },
            {
                day: "Mardi",
                data: {
                    morning: {
                        opening: new Date(),
                        closing: new Date()
                    },
                    afternoon: {
                        opening: new Date(),
                        closing: new Date()
                    }
                }
            },
            {
                day: "Mercredi",
                data: {
                    morning: {
                        opening: new Date(),
                        closing: new Date()
                    },
                    afternoon: {
                        opening: new Date(),
                        closing: new Date()
                    }
                }
            },
            {
                day: "Jeudi",
                data: {
                    morning: {
                        opening: new Date(),
                        closing: new Date()
                    },
                    afternoon: {
                        opening: new Date(),
                        closing: new Date()
                    }
                }
            },
            {
                day: "Vendredi",
                data: {
                    morning: {
                        opening: new Date(),
                        closing: new Date()
                    },
                    afternoon: {
                        opening: new Date(),
                        closing: new Date()
                    }
                }
            },
            {
                day: "Samedi",
                data: {
                    morning: {
                        opening: new Date(),
                        closing: new Date()
                    },
                    afternoon: {
                        opening: new Date(),
                        closing: new Date()
                    }
                }
            }], "__v" : 0 }
    ];

    validateForm: ControlGroup;
    alertService: AlertService;
    mailService: MailManager;
    users = [];
    isOpen = [];

    userType: {};
    currentType: number;

    constructor(public adminService: AdminFactory,public productService: ProductFactory, public service: UserFactory, fb: FormBuilder, formValidator: FormValidator, @Inject(forwardRef(() => MailManager)) mailService, @Inject(forwardRef(() => AlertService)) alertService){
        this.alertService = alertService;
        this.mailService = mailService;
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
        this.productService.countProductPrice()
            .subscribe(
                response => {
                    if(response.success){
                        this.userType = response.data;
                        this.alertService.addAlert('success', response.message);
                    }else{
                        this.alertService.addAlert('warning', response.message);
                    }
                },
                err => {
                    this.alertService.addAlert('danger', 500);
                },
                () => console.log('Authentification')
            );


        this.getUnvalidateUser();
    }

    modifyUser(i){
        this.model = this.users[i];
    }

    validateUser(){
                this.model.state = true;
                for(var i in this.userType){
                    if(this.userType[this.currentType] != 'undefined'){
                        this.model.type = this.userType[this.currentType-1];
                    }else{
                        this.model.type = this.userType[0];
                    }
                }

                this.service.updateUser( this.model)
            .subscribe(
                response => {
                    if(response.success){
                        this.alertService.addAlert('success', response.message);
                        this.mailService.validateUser(this.model)
                            .subscribe(
                                response => {
                                    if(response.success){
                                        console.log(response);
                                    }
                                },
                                err => {
                                    console.log(err);
                                },
                                () => console.log('Sended')
                            )
                    }else{
                        this.alertService.addAlert('warning', response.message);
                    }
                },
                err => {
                    this.alertService.addAlert('danger', 500);
                },
                () => {this.getUnvalidateUser()}
            );
        
    }
    closed(){
        this.getUnvalidateUser();
    }
    getUnvalidateUser(){
        this.adminService.getUnvalidateUser()
            .subscribe(
                response => {
                    if(response.success){
                        this.users = response.data;
                        console.log(response.data);
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
                        for(var i in this.users){
                            this.isOpen.push(false);
                        }
                        this.getShops();
                    }else{
                        console.log(response);
                    }
                },
                err =>  {
                    this.alertService.addAlert('danger', 500);
                },
                () => console.log('get user list Complete')
            );
    };

    getShops(){
        var thus = this;
        console.log('test');
        this.users.forEach(function(user, index){
            console.log("testFE");
            thus.service.getShops(user.associateShop)
                .subscribe(
                res => {
                    console.log('success');
                    if(res.success){
                        console.log("test2");
                        console.log(res.data);
                        thus.users[index].associateShop = res.data;
                        for (var i = 0; i < thus.users[index].associateShop.length; i++) {
                            for (var j = 0; j < thus.users[index].associateShop[i].disponibility.length; j++) {
                                console.log('test3');
                                thus.users[index].associateShop[i].disponibility[j].data.morning.opening = new Date(thus.users[index].associateShop[i].disponibility[j].data.morning.opening);
                                thus.users[index].associateShop[i].disponibility[j].data.morning.closing = new Date(thus.users[index].associateShop[i].disponibility[j].data.morning.closing);
                                thus.users[index].associateShop[i].disponibility[j].data.afternoon.opening = new Date(thus.users[index].associateShop[i].disponibility[j].data.afternoon.opening);
                                thus.users[index].associateShop[i].disponibility[j].data.afternoon.closing = new Date(thus.users[index].associateShop[i].disponibility[j].data.afternoon.closing);
                            }
                        }
                    }else{
                        console.log(res.message);
                    }
                },
                err => {
                    console.log("error");
                }
            );
        })
    }

    addDay(i, day){
        if(this.timepickerDay.data.morning.closing.getTime() <= this.timepickerDay.data.morning.opening.getTime()){
            alert('La date d\'ouverture du matin doit etre plus tot que la date de fermeture');
        }else if(this.timepickerDay.data.afternoon.closing.getTime() <= this.timepickerDay.data.afternoon.opening.getTime()){
            alert('La date d\'ouverture de l\'apres-midi doit etre plus tot que la date de fermeture');
        }else if(this.checkDayExist(this.associateShop[i]) !== false){

            this.associateShop[i].disponibility[this.checkDayExist(this.associateShop[i])] = {
                day: this.selectedDay,
                data: {
                    morning: {
                        opening: this.timepickerDay.data.morning.opening,
                        closing: this.timepickerDay.data.morning.closing
                    },
                    afternoon: {
                        opening: this.timepickerDay.data.afternoon.opening,
                        closing: this.timepickerDay.data.afternoon.closing
                    }
                }
            };
        }else{

            this.associateShop[i].disponibility.push({
                day: this.selectedDay,
                data: {
                    morning: {
                        opening: this.timepickerDay.data.morning.opening,
                        closing: this.timepickerDay.data.morning.closing
                    },
                    afternoon: {
                        opening: this.timepickerDay.data.afternoon.opening,
                        closing: this.timepickerDay.data.afternoon.closing
                    }
                }
            });
        }
    };

    checkDayExist(shop){
        var thus = this;
        var index = 7;

        shop.disponibility.forEach(function(disponibility, i){
            if(disponibility.day == thus.selectedDay){
                console.log(disponibility.day);
                index = i;
            }
        });

        if(index < 7){
            return index;
        }else{
            return false;
        }
    }

    changeCurrentDay(value){
        this.selectedDay = value;
    }
}

