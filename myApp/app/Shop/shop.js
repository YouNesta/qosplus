System.register([], function(exports_1) {
    var Shop;
    return {
        setters:[],
        execute: function() {
            Shop = (function () {
                function Shop(shop) {
                    this._name = shop.name;
                    this._adress = shop.adress;
                    this._adress2 = shop.adress2;
                    this._city = shop.city;
                    this._zipCode = shop.zipCode;
                    this._mobile = shop.mobile;
                    this._phone = shop.phone;
                    this._fax = shop.fax;
                    this._mail = shop.mail;
                }
                Object.defineProperty(Shop.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Shop.prototype, "adress", {
                    get: function () {
                        return this._adress;
                    },
                    set: function (value) {
                        this._adress = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Shop.prototype, "city", {
                    get: function () {
                        return this._city;
                    },
                    set: function (value) {
                        this._city = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Shop.prototype, "zipCode", {
                    get: function () {
                        return this._zipCode;
                    },
                    set: function (value) {
                        this._zipCode = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Shop.prototype, "mobile", {
                    get: function () {
                        return this._mobile;
                    },
                    set: function (value) {
                        this._mobile = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Shop.prototype, "phone", {
                    get: function () {
                        return this._phone;
                    },
                    set: function (value) {
                        this._phone = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Shop.prototype, "fax", {
                    get: function () {
                        return this._fax;
                    },
                    set: function (value) {
                        this._fax = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Shop.prototype, "mail", {
                    get: function () {
                        return this._mail;
                    },
                    set: function (value) {
                        this._mail = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Shop;
            })();
            exports_1("Shop", Shop);
        }
    }
});
//# sourceMappingURL=shop.js.map