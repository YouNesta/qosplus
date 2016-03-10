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
    director: User;
    shop: Shop;
    financialShop: Shop;
    deliverShop: Shop;

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
            same:'',
            lastName: '',
            firstName: '',
            phone: '',
            mail: '',
        },
        tva: '',
        siret: '',
        adeli: '',
        nightbox: '',
        financialShop: {
            same:'',
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
            same:'',
            mail:''
        },
        paymentDate: '',
        deliverShop: {
            same:'',
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
            this.shop = new Shop(this.model.shop);
            this.user = new User(this.model);
            this.user.shop = this.shop;

            if(!this.model.director.same){
                this.director = new User(this.model.director);
            }

            if(!this.model.financialShop.same){
                this.financialShop = new Shop(this.model.financialShop);
            }

            if(!this.model.deliverShop.same){
                this.deliverShop = new Shop(this.model.deliverShop);
            }

            if(!this.model.financialMail.same){
                this.model.financialMail.mail = this.shop.mail;
            }

            this.user.director = this.director;
            this.user.financialShop = this.financialShop;
            this.user.deliverShop = this.deliverShop;
            this.user.fiancialMail = this.model.financialMail.mail;

            this.service.save(this.user);


        }


    }
}
