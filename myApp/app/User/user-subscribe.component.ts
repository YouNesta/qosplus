import {Component} from 'angular2/core';
import {User} from "./user";
import {UserFactory} from "./user.factory";
import {Shop} from "../Shop/shop";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";


@Component({
    providers: [],
    templateUrl: "app/User/user-subscribe.html",
})

export class UserSubscribeComponent {
    service: UserFactory ;
    subscribeForm: ControlGroup;

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
        tva: 0,
        siret: 0,
        adeli: 0,
        nightBox: true,
        transporteur:'',
        openDay: "",
        closeDay: "",
        openHour: "",
        closeHour: ""
    }];
    director = {

        lastName: 'ezd,c',
        firstName: 'ezlkd,',
        phone: 'dk,q',
        mail: 'd,qs;',

    };
    model = {
        role: 0,
        lastName: '',
        firstName: '',
        phone: '',
        mail: '',
        averageLens: 0,
        providerLens: "",
        averageGlasses: 0,
        providerGlasses: "",
        financialShop: "",
        IBAN: 0,
        BIC: 0,
        financialMail:'',
        paymentState: true,
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
        role: 0,
        lastName: '',
        firstName: '',
        phone: '',
        mail: '',
        averageLens: 0,
        providerLens: "",
        averageGlasses: 0,
        providerGlasses: "",
        financialShop: "",
        IBAN: 0,
        BIC: 0,
        financialMail:'',
        paymentState: true,
        deliverShop: "",
        central: '',
        comment: ''
    };

    constructor(userFactory: UserFactory, fb: FormBuilder, regEx: RegEx){





        this.service = userFactory;
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
            ])]
        });
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
            tva: 0 ,
            siret: 0,
            adeli: 0,
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
