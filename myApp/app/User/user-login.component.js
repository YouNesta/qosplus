System.register(['angular2/core', "angular2/common", "../lib/regex", "./user.factory", "angular2/router"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, regex_1, user_factory_1, router_1;
    var UserLoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (regex_1_1) {
                regex_1 = regex_1_1;
            },
            function (user_factory_1_1) {
                user_factory_1 = user_factory_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            UserLoginComponent = (function () {
                function UserLoginComponent(fb, regEx, userFactory, router) {
                    this.userFactory = userFactory;
                    this.router = router;
                    this.model = {
                        lastName: 'Boulkaddid',
                        firstName: 'Younes',
                        phone: '06.59.90.12.05',
                        mail: 'younes.boulkaddid@supinternet.fr',
                        password: '12345678'
                    };
                    this.service = userFactory;
                    this.loginForm = fb.group({
                        'mail': ['', common_1.Validators.compose([])],
                        'password': ['', common_1.Validators.compose([])]
                    });
                }
                UserLoginComponent.prototype.login = function () {
                    if (this.loginForm.valid) {
                        this.service.login(this.model);
                    }
                };
                UserLoginComponent = __decorate([
                    core_1.Component({
                        templateUrl: "app/User/user-login.html"
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, regex_1.RegEx, user_factory_1.UserFactory, router_1.Router])
                ], UserLoginComponent);
                return UserLoginComponent;
            })();
            exports_1("UserLoginComponent", UserLoginComponent);
        }
    }
});
//# sourceMappingURL=user-login.component.js.map