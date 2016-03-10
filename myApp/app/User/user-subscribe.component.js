System.register(['angular2/core', "./user", "./user.factory", "ng2-material/all", "../Shop/shop", "angular2/common", "../lib/regex"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_1, user_factory_1, all_1, shop_1, common_1, regex_1;
    var UserSubscribeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_factory_1_1) {
                user_factory_1 = user_factory_1_1;
            },
            function (all_1_1) {
                all_1 = all_1_1;
            },
            function (shop_1_1) {
                shop_1 = shop_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (regex_1_1) {
                regex_1 = regex_1_1;
            }],
        execute: function() {
            UserSubscribeComponent = (function () {
                function UserSubscribeComponent(userFactory, fb, regEx) {
                    this.model = {
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
                    this.service = userFactory;
                    this.subscribeForm = fb.group({
                        'lastName': ['', common_1.Validators.compose([])],
                        'firstName': ['', common_1.Validators.compose([])],
                        'mail': ['', common_1.Validators.compose([])],
                        'phone': ['', common_1.Validators.compose([])]
                    });
                }
                UserSubscribeComponent.prototype.subscribe = function () {
                    if (this.subscribeForm.valid) {
                        this.shop = new shop_1.Shop(this.model.shop.name, this.model.shop.adress, this.model.shop.adress2, this.model.shop.city, this.model.shop.zipCode);
                        this.shop.mobile = this.model.shop.mobile;
                        this.shop.phone = this.model.shop.phone;
                        this.shop.fax = this.model.shop.fax;
                        this.shop.email = this.model.shop.email;
                        console.log(this.model);
                        this.user = new user_1.User(this.model.lastName, this.model.firstName, this.model.mail, this.model.phone);
                    }
                };
                UserSubscribeComponent = __decorate([
                    core_1.Component({
                        providers: [],
                        templateUrl: "app/User/user-subscribe.html",
                        directives: [all_1.MATERIAL_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [user_factory_1.UserFactory, common_1.FormBuilder, regex_1.RegEx])
                ], UserSubscribeComponent);
                return UserSubscribeComponent;
            })();
            exports_1("UserSubscribeComponent", UserSubscribeComponent);
        }
    }
});
//# sourceMappingURL=user-subscribe.component.js.map