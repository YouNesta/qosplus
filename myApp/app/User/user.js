System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(id, socialReason, mail, lastname, firstname, shop, director, tva, siret, adeli, nightBox, financialSociety, IBAN, BIC, fiancialMail, paymentDate, deliverShop, central) {
                    this.id = id;
                    this.socialReason = socialReason;
                    this.mail = mail;
                    this.lastname = lastname;
                    this.firstname = firstname;
                    this.shop = shop;
                    this.director = director;
                    this.tva = tva;
                    this.siret = siret;
                    this.adeli = adeli;
                    this.nightBox = nightBox;
                    this.financialSociety = financialSociety;
                    this.IBAN = IBAN;
                    this.BIC = BIC;
                    this.fiancialMail = fiancialMail;
                    this.paymentDate = paymentDate;
                    this.deliverShop = deliverShop;
                    this.central = central;
                }
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map