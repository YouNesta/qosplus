System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', "angular2/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, http_2;
    var UserFactory;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            UserFactory = (function () {
                function UserFactory(http) {
                    this.http = null;
                    this.apiUrl = "http://192.168.33.10:8080/api/v1/client/";
                    this.http = http;
                }
                UserFactory.prototype.save = function (user, shop, option) {
                    var data = JSON.stringify({ user: user, shop: shop, option: option });
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http
                        .post(this.apiUrl + 'users/subscribe', data, {
                        headers: headers
                    })
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) { return console.log(response); }, function (err) { return console.log(err); }, function () { return console.log('Authentication Complete'); });
                };
                UserFactory = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserFactory);
                return UserFactory;
            })();
            exports_1("UserFactory", UserFactory);
        }
    }
});
//# sourceMappingURL=user.factory.js.map