System.register(['angular2/core', "./user"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_1;
    var UserSubscribeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            UserSubscribeComponent = (function () {
                function UserSubscribeComponent() {
                    this.user = new user_1.User(1, 'Younes', 'Nesta');
                }
                UserSubscribeComponent.prototype.subscribe = function (http) {
                    console.log(this.user);
                    this.user = new user_1.User(this.user.id + 1, this.user.firstname, this.user.lastname);
                    console.log(this.user);
                    this.http.save(this.user);
                    // Subscribe to the observable to get the parsed people object and attach it to the
                    // component
                };
                UserSubscribeComponent = __decorate([
                    core_1.Component({
                        templateUrl: "app/User/user-subscribe.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], UserSubscribeComponent);
                return UserSubscribeComponent;
            })();
            exports_1("UserSubscribeComponent", UserSubscribeComponent);
        }
    }
});
//# sourceMappingURL=user-subscribe.component.js.map