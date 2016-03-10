
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()

export class UserFactory {
    http = null;
    apiUrl = "http://192.168.33.10:8080/api/v1/";
    constructor(http:Http) {
        this.http = http

    }

    save(){
        this.http.get(this.apiUrl + 'users/subscribe')
            .map( (responseData) => responseData.text())
            .subscribe(
                data => console.log(data),
                err => console.log(err),
                () => console.log('Random Quote Complete')
            );
    }
}