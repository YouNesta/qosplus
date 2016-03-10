System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var RegEx;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            RegEx = (function () {
                function RegEx() {
                    this._Phone = {
                        french: {
                            mobile: "",
                            fix: '^((\\+|00)33\\s?|0)[1-5|9](\\s?\\d{2}){4}$'
                        }
                    };
                    this._Email = "^(\\w[-._+\\w]*\\w@\\w[-._\\w]*\\w\\.\\w{2,3})$";
                }
                Object.defineProperty(RegEx.prototype, "Phone", {
                    get: function () {
                        return this._Phone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RegEx.prototype, "Email", {
                    get: function () {
                        return this._Email;
                    },
                    enumerable: true,
                    configurable: true
                });
                RegEx = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], RegEx);
                return RegEx;
            })();
            exports_1("RegEx", RegEx);
        }
    }
});
//# sourceMappingURL=regex.js.map