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
    user: User;
    shop: Shop;
   /* shopModel ={
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
        tva: '',
        siret: '',
        adeli: '',
        nightBox: '',
        transporteur:'',
        openDay: "",
        openHour: ""
    };
    */
/*
    model = {
        lastName: '',
        firstName: '',
        phone: '',
        mail: '',
        director: {
            id:'',
            lastName: '',
            firstName: '',
            phone: '',
            mail: '',
        },
        associateShop: [],
        averageLens: "",
        providerLens: "",
        averageGlasses: "",
        providerGlasses: "",
        financialShop: {
            id:'',
            name: "",
            adress: "",
            adress2: "",
            city: "",
            zipCode: "",
            mobile: "",
            phone: "",
            fax: "",
            mail: ""
        },
        IBAN: '',
        BIC: '',
        financialMail:{
            id:'',
            mail:''
        },
        paymentState: '',
        deliverShop: {
            id:'',
            name: "",
            adress: "",
            adress2: "",
            city: "",
            zipCode: "",
            mobile: "",
            phone: "",
            fax: "",
            mail: ""
        },
        central: '',
    };
*/

    shopModel ={
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
        closeHour: "10h:11",
    };

    model = {
        role: 1,
        lastName: 'Boulkaddid',
        firstName: 'Younes',
        phone: '06.59.90.12.05',
        mail: 'younes.boulkaddid@supinternet.fr',
        director: {
            lastName: 'Baptiste',
            firstName: 'Ferenbach',
            phone: '0657',
            mail: 'YJU',
        },
        associateShop: [75010112],
        averageLens: 234567,
        providerLens: "Aflelou",
        averageGlasses: 234567,
        providerGlasses: "Aflelou",
        financialShop: {
            name: "efsdc",
            adress: "ezqd",
            adress2: "",
            city: "98765",
            zipCode: "9876",
            mobile: "efzqc",
            phone: "jhfg",
            fax: "deklqjs",
            mail: "cjk"
        },
        IBAN: 098765434567890,
        BIC: 0987654567890,
        financialMail:'cacacacacacacaca',
        paymentState: true,
        deliverShop: {
            name: "ygerfuhsdk",
            adress: "hefjzbdskn",
            adress2: "zhjeqdkc",
            city: "ehbfjcs",
            zipCode: 9977,
            mobile: "ezfqc",
            phone: "efzcd",
            fax: "ezcd",
            mail: "ezcd"
        },
        central: 'Central datatatata',
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
            this.user.role = 1;
            this.shop = this.shopModel;
            if(!this.isSame.director){
                this.user.director = this.model.director;
            }
            if(!this.isSame.financialShop){
                this.user.financialShop = this.model.financialShop;
            }
            if(!this.isSame.deliverShop){
                this.user.deliverShop  = this.model.deliverShop;
            }
            if(!this.isSame.financialMail){
                this.user.financialMail = this.model.financialMail;
            }else{
                this.user.financialMail = this.shop.mail;
            }
                this.service.save(this.user, this.shop, this.isSame);
        }


    }
}
