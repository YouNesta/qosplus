System.register([], function(exports_1) {
    var Shop;
    return {
        setters:[],
        execute: function() {
            Shop = (function () {
                function Shop(name, adress, adress2, city, zipcode, mobile, phone, fax, email) {
                    this._name = name;
                    this._adress = adress;
                    this._adress2 = adress2;
                    this._city = city;
                    this._zipcode = zipcode;
                    this._mobile = mobile;
                    this._phone = phone;
                    this._fax = fax;
                    this._email = email;
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
                Object.defineProperty(Shop.prototype, "zipcode", {
                    get: function () {
                        return this._zipcode;
                    },
                    set: function (value) {
                        this._zipcode = value;
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
                Object.defineProperty(Shop.prototype, "email", {
                    get: function () {
                        return this._email;
                    },
                    set: function (value) {
                        this._email = value;
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