/**
 * Created by Younes on 15/04/2016.
 */

import {Injectable} from 'angular2/core';

@Injectable()

export class API {
    origin = "http://192.168.33.10"
    url = this.origin+":8080/api/v1/";
    admin = 'admin/';
    user = 'client/user/';
    product = 'product/';
    upload = this.origin+":2028/upload/";
    command = 'command/';
    mail = 'mail/';
}
