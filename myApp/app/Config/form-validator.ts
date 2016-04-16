
import {Injectable} from 'angular2/core';
import {Control} from "angular2/common";
import {Validators} from "angular2/common";

@Injectable()

export class FormValidator {
    name: Control;
    email: Control;
    phone: Control;
    mobile: Control;

constructor() {
        this.name = new Control('', Validators.compose([
           /* Validators.required,
            Validators.minLength(4)*/
        ]));
        this.email = new Control('', Validators.compose([
       /*     Validators.required,
            Validators.minLength(3)*/
        ]));
        this.phone = new Control('', Validators.compose([
           /* Validators.required,
            Validators.minLength(3)*/
        ]));
    this.mobile = new Control('', Validators.compose([
     /*   Validators.required,
        Validators.minLength(3)*/
    ]));
}

}