import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {Path} from "path";
import {childProcess} from "child_process";

@Component({
    providers: [],
    templateUrl: "app/Product/product-command-list.html",
    directives: [ ACCORDION_DIRECTIVES ]

})

export class ProductCommandComponent {

    commands: Object ;
    isOpen = [];
    constructor(public service: ProductFactory){
        this.service.getCommands()
            .subscribe(
                res => {
                    if(res.success){
                        this.commands = res.data;
                        for(var i in this.commands){
                            this.isOpen.push(false);
                        }
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get command list Complete')
            );
    }

    printPdf(i) {

        var command = this.commands[i];

        if (command.commandForm != "" && command.commandForm) {
            var url = command.commandForm;
            if (this.urlExists(url) == true) {
                window.open(url, "_blank");
            } else {
                this.generatePdf(command, i);
            }
        } else {
            this.generatePdf(command, i);
        }
    }

    generatePdf(command, i) {
        command = this.service.printPdf(command).subscribe(
            res => {
                if(res.success){
                    command = res.data;

                    this.commands[i] = command;

                    window.open(command.commandForm, "_blank");
                }else{
                    console.log(res);
                }
            },
            err =>  console.log(err),
            () => console.log('command updated')
        );
    }

    urlExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    }

    /*
    * 0 => paid
    * 1 => unvalidate
    * 2 => waiting for payment
    * */

    changeStatus(i) {
        var command = this.commands[i];
        command = this.service.changeCommandStatus(command._id).subscribe(
            res => {
                if(res.success){
                    command = res.data;

                    this.commands[i] = command;


                }else{
                    console.log(res);
                }
            },
            err =>  console.log(err),
            () => console.log('command updated')
        );
    }

}