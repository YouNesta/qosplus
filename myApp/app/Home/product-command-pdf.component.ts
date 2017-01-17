import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "./../Product/product.factory.ts";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import {UserFactory} from "../User/user.factory.ts";

@Component({
    selector: "user-command-pdf",
    templateUrl: "app/Home/product-command-pdf.html",
    providers: [ProductFactory, UserFactory]
})

export class ProductCommandPdfComponent {

    id: string;
    command = {};
    client = {};

    constructor(public service: ProductFactory, params: RouteParams, userService: UserFactory){

        this.id = params.get('id');

        this.service.getOneCommand(this.id)
            .subscribe(
                res => {
                    if(res.success){
                        this.command = res.data;
                        this.command.date = new Date(this.command.date);
                        userService.getUserByMail(this.command.client)
                            .subscribe(
                                res => {
                                    if(res.success){
                                        this.client = res.data;
                                    }else{
                                        console.log(res);
                                    }
                                },
                                err =>  console.log(err),
                                () => console.log('get command list Complete')
                            );
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
                        setTimeout(function(){window.open(command.commandForm, "_blank")}, 1000);
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