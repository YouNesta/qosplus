System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(user) {
                    ((user.id != 'undefined') ? this._id = 0 : this._id = user.id);
                    this._role = 1;
                    this._lastName = user.lastName;
                    this._firstname = user.firstname;
                    this._mail = user.mail;
                    this._phone = user.phone;
                }
                Object.defineProperty(User.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "role", {
                    get: function () {
                        return this._role;
                    },
                    set: function (value) {
                        this._role = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "socialReason", {
                    get: function () {
                        return this._socialReason;
                    },
                    set: function (value) {
                        this._socialReason = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "mail", {
                    get: function () {
                        return this._mail;
                    },
                    set: function (value) {
                        this._mail = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "lastName", {
                    get: function () {
                        return this._lastName;
                    },
                    set: function (value) {
                        this._lastName = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "firstname", {
                    get: function () {
                        return this._firstname;
                    },
                    set: function (value) {
                        this._firstname = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "phone", {
                    get: function () {
                        return this._phone;
                    },
                    set: function (value) {
                        this._phone = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "shop", {
                    get: function () {
                        return this._shop;
                    },
                    set: function (value) {
                        this._shop = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "director", {
                    get: function () {
                        return this._director;
                    },
                    set: function (value) {
                        this._director = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "tva", {
                    get: function () {
                        return this._tva;
                    },
                    set: function (value) {
                        this._tva = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "siret", {
                    get: function () {
                        return this._siret;
                    },
                    set: function (value) {
                        this._siret = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "adeli", {
                    get: function () {
                        return this._adeli;
                    },
                    set: function (value) {
                        this._adeli = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "nightBox", {
                    get: function () {
                        return this._nightBox;
                    },
                    set: function (value) {
                        this._nightBox = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "transporteur", {
                    get: function () {
                        return this._transporteur;
                    },
                    set: function (value) {
                        this._transporteur = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "openDay", {
                    get: function () {
                        return this._openDay;
                    },
                    set: function (value) {
                        this._openDay = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "openHour", {
                    get: function () {
                        return this._openHour;
                    },
                    set: function (value) {
                        this._openHour = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "associateShop", {
                    get: function () {
                        return this._associateShop;
                    },
                    set: function (value) {
                        this._associateShop = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "averageLens", {
                    get: function () {
                        return this._averageLens;
                    },
                    set: function (value) {
                        this._averageLens = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "providerLens", {
                    get: function () {
                        return this._providerLens;
                    },
                    set: function (value) {
                        this._providerLens = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "averageGlasses", {
                    get: function () {
                        return this._averageGlasses;
                    },
                    set: function (value) {
                        this._averageGlasses = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "providerGlasses", {
                    get: function () {
                        return this._providerGlasses;
                    },
                    set: function (value) {
                        this._providerGlasses = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "commercial", {
                    get: function () {
                        return this._commercial;
                    },
                    set: function (value) {
                        this._commercial = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "financialShop", {
                    get: function () {
                        return this._financialShop;
                    },
                    set: function (value) {
                        this._financialShop = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "IBAN", {
                    get: function () {
                        return this._IBAN;
                    },
                    set: function (value) {
                        this._IBAN = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "BIC", {
                    get: function () {
                        return this._BIC;
                    },
                    set: function (value) {
                        this._BIC = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "financialMail", {
                    get: function () {
                        return this._financialMail;
                    },
                    set: function (value) {
                        this._financialMail = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "paymentState", {
                    get: function () {
                        return this._paymentState;
                    },
                    set: function (value) {
                        this._paymentState = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "deliverShop", {
                    get: function () {
                        return this._deliverShop;
                    },
                    set: function (value) {
                        this._deliverShop = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "central", {
                    get: function () {
                        return this._central;
                    },
                    set: function (value) {
                        this._central = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map