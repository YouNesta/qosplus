import {Component} from 'angular2/core';
import {User} from "../User/user";
import {UserFactory} from "../User/user.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";
import {AlertService} from "../Tools/alert";


@Component({
    selector: "user-subscribe",
    providers: [],
    templateUrl: "app/Home/home-subscribe.html",
    providers: [RegEx, UserFactory, AlertService]

})

export class HomeSubscribeComponent {
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
        tva: null,
        siret: null,
        adeli: null,
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
