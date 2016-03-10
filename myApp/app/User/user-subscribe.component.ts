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
            zipcode: "",
            mobile: "",
            phone: "",
            fax: "",
            email: ""
        },
        director: {
            lastName: '',
            fistName: '',
            phone: '',
            mail: '',
        },
        tva: '',
        siret: '',
        adeli: '',
        nightbox: '',
        financialShop: {
            name: "",
            adress: "",
            adress2: "",
            city: "",
            zipcode: "",
            mobile: "",
            phone: "",
            fax: "",
            email: ""
        },
        IBAN: '',
        BIC: '',
        financialMail: '',
        paymentDate: '',
        deliverShop: {
            _name: "",
            _adress: "",
            _adress2: "",
            _city: "",
            _zipcode: "",
            _mobile: "",
            _phone: "",
            _fax: "",
            _email: ""
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
            this.shop = new Shop(
                this.model.shop.name,
                this.model.shop.adress,
                this.model.shop.adress2,
                this.model.shop.city,
                this.model.shop.zipCode
            );
            this.shop.mobile = this.model.shop.mobile;
            this.shop.phone = this.model.shop.phone;
            this.shop.fax = this.model.shop.fax;
            this.shop.email = this.model.shop.email;
console.log(this.model);

            this.user = new User(
                this.model.lastName,
                this.model.firstName,
                this.model.mail,
                this.model.phone
            );

        }


    }
}
