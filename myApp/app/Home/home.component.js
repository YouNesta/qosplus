System.register(['angular2/core', 'angular2/router', "./home-homepage.component", "./home-about.component", "./home-products.component", "./home-contact.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, home_homepage_component_1, home_about_component_1, home_products_component_1, home_contact_component_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_homepage_component_1_1) {
                home_homepage_component_1 = home_homepage_component_1_1;
            },
            function (home_about_component_1_1) {
                home_about_component_1 = home_about_component_1_1;
            },
            function (home_products_component_1_1) {
                home_products_component_1 = home_products_component_1_1;
            },
            function (home_contact_component_1_1) {
                home_contact_component_1 = home_contact_component_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent() {
                }
                HomeComponent = __decorate([
                    core_1.Component({
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: "/", name: "Homepage", component: home_homepage_component_1.HomeHomepageComponent },
                        { path: "/about", name: "About", component: home_about_component_1.HomeAboutComponent },
                        { path: "/products", name: "Products", component: home_products_component_1.HomeProductsComponent },
                        { path: "/contact", name: "Contact", component: home_contact_component_1.HomeContactComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], HomeComponent);
                return HomeComponent;
            })();
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map