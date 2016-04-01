System.register(['angular2/core', 'angular2/platform/browser', 'angular2/http', 'angular2-jwt', 'angular2/router', "./Layouts/header.component", "./Layouts/footer.component", './User/user.component', './Home/home.component', "./User/user.factory", "./lib/regex", "./Config/route-auth", "./Admin/admin.component", "./Admin/admin.factory", "./Page/page-not-found.component", "angular2/core", "angular2/router", "./Config/form-validator"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, http_1, angular2_jwt_1, router_1, core_2, header_component_1, footer_component_1, user_component_1, home_component_1, user_factory_1, regex_1, route_auth_1, admin_component_1, admin_factory_1, page_not_found_component_1, core_3, router_2, form_validator_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (footer_component_1_1) {
                footer_component_1 = footer_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (user_factory_1_1) {
                user_factory_1 = user_factory_1_1;
            },
            function (regex_1_1) {
                regex_1 = regex_1_1;
            },
            function (route_auth_1_1) {
                route_auth_1 = route_auth_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (admin_factory_1_1) {
                admin_factory_1 = admin_factory_1_1;
            },
            function (page_not_found_component_1_1) {
                page_not_found_component_1 = page_not_found_component_1_1;
            },
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (form_validator_1_1) {
                form_validator_1 = form_validator_1_1;
            }],
        execute: function() {
            core_2.enableProdMode();
            App = (function () {
                function App(service, router, routeAuth) {
                    var _this = this;
                    this.service = service;
                    this.router = router;
                    this.title = "penis";
                    this.routeAuth = {
                        base: " ",
                        name: " ",
                        auth: "false"
                    };
                    if (this.service.isConnected() && angular2_jwt_1.tokenNotExpired('token')) {
                        this.service.user();
                    }
                    router.subscribe(function (val) {
                        _this.routeAuth = routeAuth.routeAuth(val);
                    });
                }
                App = __decorate([
                    core_1.Component({
                        selector: "app",
                        template: "<header [connected]='service.isConnected()' [admin]='service.isAdmin()'></header>" +
                            "<div class='content {{routeAuth.base}}'><router-outlet></router-outlet></div>" +
                            "<footer>{{title}}</footer>",
                        directives: [router_1.ROUTER_DIRECTIVES, header_component_1.HeaderComponent, footer_component_1.FooterComponent]
                    }),
                    router_1.RouteConfig([
                        { path: "/...", as: "Home", component: home_component_1.HomeComponent },
                        { path: "/user/...", as: "User", component: user_component_1.UserComponent },
                        { path: "/admin/...", as: "Admin", component: admin_component_1.AdminComponent },
                        { path: '/404', name: '404', component: page_not_found_component_1.PageNotFoundComponent },
                        { path: '/*path', redirectTo: ['404'] }
                    ]), 
                    __metadata('design:paramtypes', [user_factory_1.UserFactory, router_1.Router, route_auth_1.RouteAuth])
                ], App);
                return App;
            })();
            exports_1("App", App);
            browser_1.bootstrap(App, [
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                user_factory_1.UserFactory,
                regex_1.RegEx,
                route_auth_1.RouteAuth,
                admin_factory_1.AdminFactory,
                core_3.provide(angular2_jwt_1.AuthHttp, {
                    useFactory: function (http) {
                        return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({ headerName: 'Authorization', tokenName: "token", tokenGetter: function () {
                                return localStorage.getItem("token");
                            }, noJwtError: true }), http);
                    },
                    deps: [http_1.Http]
                }),
                core_3.provide(router_2.APP_BASE_HREF, { useValue: '/' }),
                form_validator_1.FormValidator
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map