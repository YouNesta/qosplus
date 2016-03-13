System.register(['angular2/core', "./nav-user.component", "angular2/router", "../Config/route-auth"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, nav_user_component_1, router_1, route_auth_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (nav_user_component_1_1) {
                nav_user_component_1 = nav_user_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (route_auth_1_1) {
                route_auth_1 = route_auth_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(router, routeAuth) {
                    var _this = this;
                    this.router = router;
                    this.routeAuth = '';
                    this.title = "QosPlus";
                    router.subscribe(function (val) {
                        _this.routeAuth = routeAuth.routeAuth(val);
                    });
                }
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: "header",
                        templateUrl: "app/Layouts/header.html",
                        directives: [nav_user_component_1.NavUserComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, route_auth_1.RouteAuth])
                ], HeaderComponent);
                return HeaderComponent;
            })();
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
//# sourceMappingURL=header.component.js.map