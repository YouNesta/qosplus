
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Headers} from "angular2/http";

@Injectable()

export class AdminFactory {
    http = null;
    apiUrl = "http://192.168.33.10:8080/api/v1/admin/";
    constructor(http:Http) {
        this.http = http

    }

    save(user){
      var data =  JSON.stringify({user});
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .post(this.apiUrl + 'subscribe',
                data, {
                    headers: headers
                })
            .map(response => response.json())
            .subscribe(
                response => console.log(response),
                err =>  console.log(err),
                () => console.log('Subscription Complete')
            );
    }


}