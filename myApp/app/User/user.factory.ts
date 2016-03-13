
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";

@Injectable()

export class UserFactory {
    http = null;
    apiUrl = "http://192.168.33.10:8080/api/v1/client/";
    constructor(http:Http) {
        this.http = http

    }

    save(user, shop, option){
      var data =  JSON.stringify({user, shop, option});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .post(this.apiUrl + 'users/subscribe',
                data, {
                    headers: headers
                })
            .map(response => response.json())
            .subscribe(
                response => console.log(response),
                err =>  console.log(err),
                () => console.log('Authentication Complete')
            );
    }


}