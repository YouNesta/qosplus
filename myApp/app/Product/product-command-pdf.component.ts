import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';

@Component({
    providers: [],
    templateUrl: "app/Product/product-command-pdf.html",
})

export class ProductCommandPdfComponent {

    id: string ;
    command: Object;

    constructor(public service: ProductFactory, params: RouteParams){

        this.id = params.get('id');

        this.service.getOneCommand(this.id)
            .subscribe(
                res => {
                    if(res.success){
                        this.command = res.data;
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get command list Complete')
            );
    }

    printPdf(command) {

        if (command.commandForm != "" && command.commandForm) {
            window.open(command.commandForm, "_blank");
        } else {
            command = this.service.printPdf(command).subscribe(
                res => {
                    if(res.success){
                        command = res.data;

                        window.open(command.commandForm, "_blank");
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('command updated')
            );

        }

    }

}