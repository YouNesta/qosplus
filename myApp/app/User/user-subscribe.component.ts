import {Component} from 'angular2/core';
import {User} from "./user";
import {UserFactory} from "./user.factory";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Shop} from "../Shop/shop";
import {FormBuilder, Validators} from "angular2/common";
import {MdNumberRequiredValidator, MdMinValueValidator, MdPatternValidator, MdMaxValueValidator} from "ng2-material/components/form/validators";
import {ControlGroup} from "angular2/common";
import {RegEx} from "../lib/regex";

@Component({
    providers: [],
    templateUrl: "app/User/user-subscribe.html",
    directives: [MATERIAL_DIRECTIVES]
})

export class UserSubscribeComponent {
    service: UserFactory ;

    subscribeForm: ControlGroup;
    user: User;
    shop: Shop;
    model = {
        lastName: '',
        firstName: '',
        phone: '',
        mail: '',
        socialReason: '',
        shop: {
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
        director: {
            id:'',
            lastName: '',
            firstName: '',
            phone: '',
            mail: '',
        },
        tva: '',
        siret: '',
        adeli: '',
        nightBox: '',
        transporteur:'',
        openDay: "",
        openHour: "",
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



  /*  model = {
        lastName: 'Boulkaddid',
        firstName: 'Younes',
        phone: '06.59.90.12.05',
        mail: 'boulkaddid.younes',
        socialReason: 'YOUNESTA SARL',
        shop: {
            name: "Younesta",
            adress: "43 rue de malabry",
            adress2: "",
            city: "Maisse",
            zipCode: "91720",
            mobile: "06 50 90 12 05",
            phone: "01 60 78 37 94",
            fax: "01 60 78 37 94",
            mail: "younes.boulkaddid@supinternet.fr"
        },
        director: {
            id:true,
            lastName: '',
            firstName: '',
            phone: '',
            mail: '',
        },
        tva: 0.9,
        siret: 0987654567890987,
        adeli: 876545678987654,
        nightBox: true,
        transporteur:'Mathieu',
        openDay: "Lun-Mer",
        openHour: "10h-18h",
        associateShop: [75010112],
        averageLens: 234567,
        providerLens: "Aflelou",
        averageGlasses: 234567,
        providerGlasses: "Aflelou",
        financialShop: {
            id:1,
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
        IBAN: 098765434567890,
        BIC: 0987654567890,
        financialMail:{
            id:1,
            mail:''
        },
        paymentState: true,
        deliverShop: {
            id:1,
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
        central: 'Central datatatata',
    };
*/

    constructor(userFactory: UserFactory, fb: FormBuilder, regEx: RegEx){
        this.service = userFactory;
        this.subscribeForm = fb.group({
            'lastName': ['', Validators.compose([
               /* Validators.required,
                Validators.maxLength(30)*/
            ])],
            'firstName': ['', Validators.compose([
               /* Validators.required,
                Validators.maxLength(30)*/
            ])],
            'mail': ['', Validators.compose([
               /* MdPatternValidator.inline(regEx.Email),
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(100)*/
            ])],
            'phone': ['', Validators.compose([
                /*MdPatternValidator.inline(regEx.Phone['french']['fix']),
                //MdMinValueValidator.inline(800),
                //MdMaxValueValidator.inline(4999)*/
            ])]
        });
    }


    subscribe(){

        if(this.subscribeForm.valid){
            this.user = new User(this.model);
            this.user.shop = new Shop(this.model.shop);

            if(!this.model.director.id){
                this.user.director = new User(this.model.director);
            }

            if(!this.model.financialShop.id){
                this.user.financialShop = new Shop(this.model.financialShop);
            }

            if(!this.model.deliverShop.id){
                this.user.deliverShop  = new Shop(this.model.deliverShop);
            }

            if(!this.model.financialMail.id){
                this.user.financialMail = this.model.financialMail.mail;
            }else{
                this.user.financialMail = this.user.shop.mail;
            }

                this.user.tva = this.model.tva;
                this.user.siret = this.model.siret;
                this.user.adeli = this.model.adeli;
                this.user.nightBox = this.model.nightBox;
                this.user.transporteur = this.model.transporteur;
                this.user.openDay = this.model.openDay;
                this.user.openHour = this.model.openHour;
                this.user.associateShop = this.model.associateShop;
                this.user.averageLens = this.model.averageLens;
                this.user.providerLens = this.model.providerLens;
                this.user.averageGlasses = this.model.averageGlasses;
                this.user.providerGlasses = this.model.providerGlasses;
                this.user.IBAN = this.model.IBAN;
                this.user.BIC = this.model.BIC;
                this.user.central = this.model.central;

            this.service.save(this.user);

        }


    }
}
