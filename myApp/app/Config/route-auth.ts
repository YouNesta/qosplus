
import {Injectable} from 'angular2/core';

@Injectable()

export class RouteAuth {

constructor() {
    this.route = {
        " ": [
            { "route": "/", "auth": false },
            { "route": "contact", "auth": false },
            { "route": "about", "auth": false },
            { "route": "products", "auth": false }
        ],
        "admin": [
            { "route": "/", "auth": true }
        ],

        "users": [
            { "route": "/", "auth": false },
            { "route": "subscribe", "auth": false },
            { "route": "login", "auth": false },
        ]
    }

    }
}