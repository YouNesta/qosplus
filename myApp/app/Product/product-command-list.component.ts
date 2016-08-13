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
    loader = [];
    constructor(public service: ProductFactory){
        this.service.getCommands()
            .subscribe(
                res => {
                    if(res.success){
                        this.commands = res.data;
                        for(var i in this.commands){
                            this.isOpen.push(false);
                            this.loader.push(true);
                            this.commands[i].date = new Date(this.commands[i].date);
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
        this.loader[i] = false;
        command = this.service.printPdf(command).subscribe(
            res => {
                if(res.success){
                    command = res.data;

                    this.commands[i] = command;

                    this.loader[i] = true;
                    window.open(command.commandForm, "_blank");
                }else{
                    this.loader[i] = true;
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
    * 3 => canceled
    * */

    changeStatus(i) {

        var commands = this.commands;
        var service = this.service;

        setTimeout(function() {
            var command = commands[i];

            command = service.changeCommandStatus(command._id, command.status).subscribe(
                res => {
                    if(res.success){
                        //nothing
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('command updated')
            );

        }, 100);
    }

    cancelCommand(i) {
        var command = this.commands[i];
        command = this.service.deleteCommand(command).subscribe(
            res => {
                if(res.success){
                    this.commands[i].status = 3;
                }else{
                    console.log(res);
                }
            },
            err =>  console.log(err),
            () => console.log('command updated')
        );
    }

    generateDiscount(i) {
        var command = this.commands[i];
        var percent = 100;
        this.service.generateDiscount(command, percent).subscribe(
            res => {
                if(res.success){
                    this.commands[i].discount = "true";
                }else{
                    console.log(res);
                }
            },
            err =>  console.log(err),
            () => console.log('command updated')
        );
    }

}