import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "./../Product/product.factory";
import {UserFactory} from "./user.factory";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {Path} from "path";
import {childProcess} from "child_process";

@Component({
    providers: [],
    templateUrl: "app/User/user-command.html",
    directives: [ ACCORDION_DIRECTIVES ]

})

export class UserCommandComponent {

    commands: Object ;
    isOpen = [];
    loader = [];

    constructor(public service: ProductFactory, public userService: UserFactory){

        var user = JSON.parse(localStorage.getItem("user"));

        this.userService.getUserCommands(user)
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

                    this.commands[i].commandForm = command.commandForm;

                    this.loader[i] = true;
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

    cancelCommand(i) {
        var command = this.commands[i];

        if (command.status == 1) {
            command = this.service.deleteCommand(command).subscribe(
                res => {
                    if(res.success){
                        command = res.data;
                        this.commands.splice(i, 1);

                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('command updated')
            );
        }

    }

    getCommandStatus(i) {

        var command = this.commands[i];

        switch(command.status) {
            case 0:
                return "Livrée";
            case 2:
                return "Attente de paiement";
            case 3:
                return "Annulée";
            default:
                return "-";
        }

    }

}