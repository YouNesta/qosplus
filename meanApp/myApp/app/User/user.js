System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(id, firstname, lastname) {
                    this.id = id;
                    this.firstname = firstname;
                    this.lastname = lastname;
                }
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map