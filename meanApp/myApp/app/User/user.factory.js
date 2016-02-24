System.register(['../lib/xhr.factory'], function(exports_1) {
    var xhr_factory_1;
    var UserFactory;
    return {
        setters:[
            function (xhr_factory_1_1) {
                xhr_factory_1 = xhr_factory_1_1;
            }],
        execute: function() {
            exports_1("UserFactory", UserFactory = {
                getAll: function () {
                    return xhr_factory_1.$http.get('/api/v1/users');
                },
                get: function (id) {
                    return xhr_factory_1.$http.get('/api/v1/user/' + id);
                },
                save: function (user) {
                    return xhr_factory_1.$http.post('/api/v1/user', user);
                },
                update: function (user) {
                    return xhr_factory_1.$http.put('/api/v1/user/' + user._id, user);
                },
                delete: function (id) {
                    return xhr_factory_1.$http.delete('/api/v1/user/' + id);
                }
            });
        }
    }
});
//# sourceMappingURL=user.factory.js.map