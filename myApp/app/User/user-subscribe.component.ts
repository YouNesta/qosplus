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
            name: "Younesta",
            socialReason: 'YOUNESTA SARL',
            adress: "43 rue de malabry",
            adress2: "",
            city: "Maisse",
            zipCode: "91720",
            mobile: "06 50 90 12 05",
            phone: "01 60 78 37 94",
            fax: "01 60 78 37 94",
            mail: "younes.boulkaddid@supinternet.fr",
            tva: 0.9,
            siret: 0987654567890987,
            adeli: 876545678987654,
            nightBox: true,
            transporteur:'Mathieu',
            openDay: "Lun",
            closeDay: "Lun",
            openHour: "10:30",
            closeHour: "10:11"
        });
    }
    removeShop(){
        if(this.associateShop.length > 1)
            this.associateShop.pop();
    }
}
