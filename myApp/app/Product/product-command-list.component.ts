import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {pdf} from "phantom-html2pdf";

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
        var options = {
            "html": "<h3>Hello world</h3>",
            "deleteOnAction" : true
        };
        var path = "../../public/pdf/"+command._id+".pdf";
        pdf.convert(options, function(result) {
            result.toFile(path, function() {});
        });
    }

}