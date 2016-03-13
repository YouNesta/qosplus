System.register(['angular2/core', "./user", "./user.factory", "../Shop/shop", "angular2/common", "../lib/regex"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_1, user_factory_1, shop_1, common_1, regex_1;
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
                    this.shopModel = {
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
                        transporteur: 'Mathieu',
                        openDay: "Lun",
                        closeDay: "Lun",
                        openHour: "10:30",
                        closeHour: "10h:11",
                    };
                    this.model = {
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
                        financialMail: 'cacacacacacacaca',
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
                    this.isSame = {
                        director: 0,
                        deliverShop: true,
                        financialMail: 0,
                        financialShop: 0
                    };
                    this.service = userFactory;
                    this.subscribeForm = fb.group({
                        'name': ['', common_1.Validators.compose([])],
                        'firstName': ['', common_1.Validators.compose([])],
                        'mail': ['', common_1.Validators.compose([])],
                        'phone': ['', common_1.Validators.compose([])],
                        'mobile': ['', common_1.Validators.compose([])]
                    });
                }
                UserSubscribeComponent.prototype.subscribe = function () {
                    if (this.subscribeForm.valid) {
                        this.user = new user_1.User(this.model);
                        this.shop = new shop_1.Shop(this.shopModel);
                        if (!this.isSame.director) {
                            this.user.director = new user_1.User(this.model.director);
                        }
                        if (this.isSame.financialShop) {
                            this.user.financialShop = new shop_1.Shop(this.model.financialShop);
                        }
                        if (this.isSame.deliverShop) {
                            this.user.deliverShop = new shop_1.Shop(this.model.deliverShop);
                        }
                        if (this.isSame.financialMail) {
                            this.user.financialMail = this.model.financialMail;
                        }
                        else {
                            this.user.financialMail = this.shop.mail;
                        }
                        this.shop.tva = this.shopModel.tva;
                        this.shop.siret = this.shopModel.siret;
                        this.shop.adeli = this.shopModel.adeli;
                        this.shop.nightBox = this.shopModel.nightBox;
                        this.shop.transporteur = this.shopModel.transporteur;
                        this.shop.openDay = this.shopModel.openDay;
                        this.shop.closeDay = this.shopModel.closeDay;
                        this.shop.openHour = this.shopModel.openHour;
                        this.shop.closeHour = this.shopModel.closeHour;
                        this.shop.socialReason = this.shopModel.socialReason;
                        this.user.associateShop = this.model.associateShop;
                        this.user.averageLens = this.model.averageLens;
                        this.user.providerLens = this.model.providerLens;
                        this.user.averageGlasses = this.model.averageGlasses;
                        this.user.providerGlasses = this.model.providerGlasses;
                        this.user.paymentState = this.model.paymentState;
                        this.user.IBAN = this.model.IBAN;
                        this.user.BIC = this.model.BIC;
                        this.user.central = this.model.central;
                        this.service.save(this.user, this.shop, this.isSame);
                    }
                };
                UserSubscribeComponent = __decorate([
                    core_1.Component({
                        providers: [],
                        templateUrl: "app/User/user-subscribe.html",
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