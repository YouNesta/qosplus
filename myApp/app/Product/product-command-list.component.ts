import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";

@Component({
    providers: [],
    templateUrl: "app/Product/product-command-list.html",
    directives: [ ACCORDION_DIRECTIVES ]

})

export class ProductCommandComponent {

    commands: Object ;


    constructor(public service: ProductFactory){
        this.service.getCommand()
            .subscribe(
                response => {
                    if(response.success){
                        this.commands = response.data;
                        console.log(this.commands)
                    }else{
                        console.log(response);
                    }
                },
                err =>  console.log(err),
                () => console.log('get command list Complete')
            );
    }

}