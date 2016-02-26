System.register(["../main"], function(exports_1) {
    var main_1;
    var UserFactory;
    return {
        setters:[
            function (main_1_1) {
                main_1 = main_1_1;
            }],
        execute: function() {
            exports_1("UserFactory", UserFactory = {
                construct: function (http) {
                },
                getAll: function () {
                    return this.http.get('/api/v1/users');
                },
                get: function (id) {
                    return main_1.App.http('/api/v1/users/' + id);
                },
                save: function (user) {
                    return main_1.App.http.post('/api/v1/users/subscribe', user);
                },
                update: function (user) {
                    return main_1.App.put('/api/v1/users/' + user._id, user);
                },
                delete: function (id) {
                    return main_1.App.delete('/api/v1/users/' + id);
                }
            });
        }
    }
});
//# sourceMappingURL=user.factory.js.map