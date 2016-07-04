import {Component, forwardRef, Inject} from 'angular2/core';
import {User} from "../User/user";
import {UserFactory} from "../User/user.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup, CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common";
import {RegEx} from "../lib/regex";
import {AlertService} from "../Tools/alert";
import {Timepicker} from "ng2-bootstrap";
//import {subscribeValidator} from "../lib/subscribeValidator"

@Component({
    selector: "user-subscribe",
    templateUrl: "app/Home/home-subscribe.html",
    providers: [RegEx, UserFactory, AlertService, CORE_DIRECTIVES, FORM_DIRECTIVES],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, Timepicker]
})

export class HomeSubscribeComponent {
    service: UserFactory ;
    subscribeForm: ControlGroup;
    alertService: AlertService;

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
                opening: new Date,
                closing: new Date
            },
            afternoon: {
                opening: new Date,
                closing: new Date
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
    director = {
        lastName: 'ezd,c',
        firstName: 'ezlkd,',
        phone: 'dk,q',
        mail: 'd,qs;',
    };
    model = {
        role: null,
        lastName: '',
        firstName: '',
        phone: '',
        mail: '',
        averageLens: null,
        providerLens: "",
        averageGlasses: null,
        providerGlasses: "",
        financialShop: "",
        IBAN: null,
        BIC: null,
        financialMail:'',
        paymentState: false,
        deliverShop: "",
        central: '',
        comment: ''
    };
    isSame =  {
        director: 1,
        deliverShop: false,
        financialMail: 1,
        financialShop:1
    };
    user =  {
        role: null,
        lastName: '',
        firstName: '',
        phone: '',
        mail: '',
        averageLens: null,
        providerLens: "",
        averageGlasses: null,
        providerGlasses: "",
        financialShop: "",
        IBAN: null,
        BIC: null,
        financialMail:'',
        paymentState: true,
        deliverShop: "",
        central: '',
        comment: ''
    };

/*

 associateShop = [
        {
            name: "Younesta",
            socialReason: 'YOUNESTA SARL',
            adress: "43 rue de malabry",
            adress2: "",
            city: "Maisse",
            zipCode: "91720",
            mobile: "06 50 90 12 05",
            phone: "01 60 78 37 94",
            fax: "01 60 78 37 94",
            mail: "younes@supinternet.fr",
            tva: 0.9,
            siret: 0987654567890987,
            adeli: 876545678987654,
            nightBox: true,
            transporteur:'Mathieu',
            openDay: "Lun",
            closeDay: "Lun",
            openHour: "10:30",
            closeHour: "10:11"
        }
    ];


    director=  {
        lastName: 'ezd,c',
        firstName: 'ezlkd,',
        phone: 'dk,q',
        mail: 'd,qs;',
    };

    model = {
        role: 0,
        lastName: 'Boulkaddid',
        firstName: 'Younes',
        phone: '06.59.90.12.05',
        mail: 'younes@supinternet.fr',
        averageLens: 234567,
        providerLens: "Aflelou",
        averageGlasses: 234567,
        providerGlasses: "Aflelou",
        financialShop: "rknfds,l",
        IBAN: 098765434567890,
        BIC: 0987654567890,
        financialMail:'cacacacacacacaca',
        paymentState: true,
        deliverShop: "rkjfnedls,",
        central: 'Central datatatata',
        comment: 'ehrjsvdfksx'
    };
    isSame =  {
        director: 1,
        deliverShop: false,
        financialMail: 1,
        financialShop:1

    };

    user =  {
        role: null,
        lastName: '',
        firstName: '',
        phone: '',
        mail: '',
        averageLens: null,
        providerLens: "",
        averageGlasses: null,
        providerGlasses: "",
        financialShop: "",
        IBAN: null,
        BIC: null,
        financialMail:'',
        paymentState: true,
        deliverShop: "",
        central: '',
        comment: ''
    };*/

    constructor(userFactory: UserFactory, fb: FormBuilder, regEx: RegEx, @Inject(forwardRef(() => AlertService)) alertService){





        this.service = userFactory;
        this.alertService = alertService;
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
                Validators.required,
                /*Validators.minLength(10),
                Validators.maxLength(100)
                subscribeValidator.usernameTaken*/
            ])],
            'phone': ['', Validators.compose([
            ])],
            'mobile': ['', Validators.compose([
            ])]
        });
    }

    addDay(i, day){

        //
        if(this.timepickerDay.data.morning.closing.getTime() < this.timepickerDay.data.morning.opening.getTime()){
            this.alertService.addAlert('warning', 'La date d\'ouverture du matin doit etre plus tot que la date de fermeture');
        }else if(this.timepickerDay.data.morning.closing.getTime() < this.timepickerDay.data.morning.opening.getTime()){
            this.alertService.addAlert('warning', 'La date d\'ouverture de l\'apres-midi doit etre plus tot que la date de fermeture');
        }else if(this.checkDayExist(this.associateShop[i])){

            this.associateShop[i].disponibility.forEach(function(disponibility){
                if(disponibility.day == this.selectedDay){
                    disponibility.push({
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
                    })
                }
            });

        }
        else{
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
            console.log(this.associateShop[i].disponibility);
        }
    };

    checkDayExist(shop){
        return shop.disponibility.day === this.selectedDay;
    }

    changeCurrentDay(value){
        this.selectedDay = value;
    }

    subscribe(){
        if(this.subscribeForm.valid){
            this.user = this.model;
            this.user.role = 0;

            if(!this.isSame.financialMail){
                this.user.financialMail = this.model.financialMail;
            }else{
                this.user.financialMail = this.associateShop[0].mail;
            }
                this.service.save(this.user, this.associateShop, this.director, this.isSame);
        }


    }

    addShop(){
        this.associateShop.push({
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
            tva: null ,
            siret: null,
            adeli: null,
            nightBox: true,
            transporteur:'',
            openDay: "",
            closeDay: "",
            openHour: "",
            closeHour: ""
        });
    }
    removeShop(){
        if(this.associateShop.length > 1)
            this.associateShop.pop();
    }
}