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
                            zipCode: "",
                            mobile: "",
                            phone: "",
                            fax: "",
                            mail: ""
                        },
                        director: {
                            id: '',
                            lastName: '',
                            firstName: '',
                            phone: '',
                            mail: '',
                        },
                        tva: '',
                        siret: '',
                        adeli: '',
                        nightBox: '',
                        transporteur: '',
                        openDay: "",
                        openHour: "",
                        associateShop: [],
                        averageLens: "",
                        providerLens: "",
                        averageGlasses: "",
                        providerGlasses: "",
                        financialShop: {
                            id: '',
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
                        financialMail: {
                            id: '',
                            mail: ''
                        },
                        paymentState: '',
                        deliverShop: {
                            id: '',
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
                        this.user = new user_1.User(this.model);
                        this.user.shop = new shop_1.Shop(this.model.shop);
                        if (!this.model.director.id) {
                            this.user.director = new user_1.User(this.model.director);
                        }
                        if (!this.model.financialShop.id) {
                            this.user.financialShop = new shop_1.Shop(this.model.financialShop);
                        }
                        if (!this.model.deliverShop.id) {
                            this.user.deliverShop = new shop_1.Shop(this.model.deliverShop);
                        }
                        if (!this.model.financialMail.id) {
                            this.user.financialMail = this.model.financialMail.mail;
                        }
                        else {
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