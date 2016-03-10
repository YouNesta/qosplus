System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(lastname, firstname, mail, phone) {
                    this._lastname = lastname;
                    this._firstname = firstname;
                    this._mail = mail;
                    this._phone = phone;
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
                Object.defineProperty(User.prototype, "lastname", {
                    get: function () {
                        return this._lastname;
                    },
                    set: function (value) {
                        this._lastname = value;
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
                Object.defineProperty(User.prototype, "financialSociety", {
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
                Object.defineProperty(User.prototype, "fiancialMail", {
                    get: function () {
                        return this._fiancialMail;
                    },
                    set: function (value) {
                        this._fiancialMail = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "paymentDate", {
                    get: function () {
                        return this._paymentDate;
                    },
                    set: function (value) {
                        this._paymentDate = value;
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