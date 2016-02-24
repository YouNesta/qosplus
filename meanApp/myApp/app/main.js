System.register(['angular2/core', 'angular2/platform/browser', 'angular2/router', "./Layouts/header.component", './User/user.component', './Home/home.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, router_1, core_2, header_component_1, user_component_1, home_component_1;
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
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            }],
        execute: function() {
            core_2.enableProdMode();
            App = (function () {
                function App() {
                }
                App = __decorate([
                    core_1.Component({
                        selector: "app",
                        template: "<header></header>" +
                            "<router-outlet></router-outlet>" +
                            "<footer>{{title}}</footer>",
                        directives: [router_1.ROUTER_DIRECTIVES, header_component_1.HeaderComponent]
                    }),
                    router_1.RouteConfig([
                        { path: "/", as: "Home", component: home_component_1.HomeComponent },
                        { path: "/users/...", as: "Users", component: user_component_1.UserComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            })();
            exports_1("App", App);
            browser_1.bootstrap(App, [router_1.ROUTER_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=main.js.map