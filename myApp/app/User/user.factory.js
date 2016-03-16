System.register(['angular2/core', 'rxjs/Rx', "angular2/http", 'angular2-jwt', "angular2/router"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, angular2_jwt_1, router_1;
    var UserFactory;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            UserFactory = (function () {
                function UserFactory(authHttp, router) {
                    this.authHttp = authHttp;
                    this.router = router;
                    this.http = null;
                    this.apiUrl = "http://192.168.33.10:8080/api/v1/client/user/";
                    this.login = function (user) {
                        var _this = this;
                        var data = JSON.stringify({ user: user });
                        var headers = new http_1.Headers();
                        headers.append('Content-Type', 'application/json');
                        return this.authHttp
                            .post(this.apiUrl + 'login', data, {
                            headers: headers
                        })
                            .map(function (response) { return response.json(); })
                            .map(function (response) {
                            if (response) {
                                return response;
                            }
                            else {
                                console.log("Error");
                            }
                            return response;
                        })
                            .subscribe(function (res) {
                            if (res.success) {
                                var user = JSON.stringify(res.data);
                                localStorage.setItem("user", user);
                                localStorage.setItem('token', res.token);
                                if (res.data.role > 0) {
                                    _this.router.navigateByUrl('/admin');
                                }
                                else {
                                    console.log(345678);
                                    _this.router.navigateByUrl('/user');
                                }
                            }
                            else {
                            }
                        }, function (err) {
                            console.log(err);
                        }, function () { return console.log('Authentification'); });
                    };
                }
                UserFactory.prototype.save = function (user, shops, director, option) {
                    var data = JSON.stringify({ user: user, shops: shops, director: director, option: option });
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.authHttp
                        .post(this.apiUrl + 'subscribe', data, {
                        headers: headers
                    })
                        .map(function (response) { return response.json(); })
                        .subscribe(function (response) { return console.log(response); }, function (err) { return console.log(err); }, function () { return console.log('Authentication Complete'); });
                };
                UserFactory.prototype.user = function () {
                    if (localStorage.getItem('user')) {
                        return JSON.parse(localStorage.getItem('user'));
                    }
                    else {
                        this.getUser()
                            .subscribe(function (res) {
                            return JSON.parse(localStorage.getItem('user'));
                        }, function (err) { return console.log(err); });
                    }
                };
                UserFactory.prototype.getUser = function () {
                    return this.authHttp
                        .get(this.apiUrl + 'get')
                        .map(function (response) { return response.json(); })
                        .map(function (response) {
                        if (response) {
                            var user = JSON.stringify(response.data);
                            localStorage.setItem("user", user);
                            return response;
                        }
                        else {
                            console.log("Error");
                        }
                        return response;
                    });
                };
                UserFactory.prototype.logout = function () {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/');
                };
                UserFactory.prototype.isConnected = function () {
                    var token = localStorage.getItem('token');
                    if (token != 'undefined') {
                        return token;
                    }
                    return false;
                };
                UserFactory.prototype.isAdmin = function () {
                    if (localStorage.getItem('user')) {
                        var user = localStorage.getItem('user');
                        user = JSON.parse(user);
                        return user.role;
                    }
                    return 0;
                };
                UserFactory = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, router_1.Router])
                ], UserFactory);
                return UserFactory;
            })();
            exports_1("UserFactory", UserFactory);
        }
    }
});
//# sourceMappingURL=user.factory.js.map