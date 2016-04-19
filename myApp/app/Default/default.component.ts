import {Component, forwardRef, Inject} from 'angular2/core';
import {DefaultFactory} from "./default.factory";
import {FormBuilder, Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {AlertService} from "../Tools/alert";


@Component({
    selector: "defaukt",
    templateUrl: "app/Product/product-price.html",
    directives: []
})


export class DefaultComponent {
    alertService: AlertService;
    subscribeForm: ControlGroup;

    constructor(public service: DefaultFactory, fb: FormBuilder, @Inject(forwardRef(() => AlertService)) alertService){
        this.subscribeForm = fb.group({
            'name': ['', Validators.compose([
                /* Validators.required,
                 Validators.maxLength(30)*/
            ])],
        });
        this.alertService = alertService;


    }

}
