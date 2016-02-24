System.register([], function(exports_1) {
    var $http;
    // borrowed from https://github.com/afj176/ng2-express-starter/blob/master/public/components/contact/Contact.js#L36
    function _sendRequest(url, payLoad, type) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(type, url);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.onload = function () {
                if (req.status == 200) {
                    resolve(JSON.parse(req.response));
                }
                else {
                    reject(JSON.parse(req.response));
                }
            };
            req.onerror = function () {
                reject(JSON.parse(req.response));
            };
            if (payLoad) {
                req.send(JSON.stringify(payLoad));
            }
            else {
                req.send(null);
            }
        });
    }
    return {
        setters:[],
        execute: function() {
            exports_1("$http", $http = {
                get: function (url) {
                    return _sendRequest(url, null, 'GET');
                },
                post: function (url, payload) {
                    return _sendRequest(url, payload, 'POST');
                },
                put: function (url, payload) {
                    return _sendRequest(url, payload, 'PUT');
                },
                delete: function (url, payload) {
                    return _sendRequest(url, null, 'DELETE');
                }
            });
        }
    }
});
//# sourceMappingURL=xhr.factory.js.map