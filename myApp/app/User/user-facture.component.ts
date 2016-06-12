import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "./../Product/product.factory";
import {UserFactory} from "./user.factory";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {Path} from "path";
import {childProcess} from "child_process";

@Component({
    providers: [],
    templateUrl: "app/Product/product-facture.html",
    directives: [ ACCORDION_DIRECTIVES ]

})

export class UserFactureComponent {

    payments: Object ;
    isOpen = [];

    constructor(public service: ProductFactory, public userService: UserFactory){

        var user = JSON.parse(localStorage.getItem("user"));

        this.userService.getUserPayments(user)
            .subscribe(
                res => {
                    if(res.success){
                        this.payments = res.data;
                        for(var i in this.payments){
                            this.isOpen.push(false);
                        }
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('get payment list Complete')
            );
    }

    printPdf(i) {

        var payment = this.payments[i];

        if (payment.facture != "" && payment.facture) {
            var url = payment.facture;
            if (this.urlExists(url) == true) {
                window.open(url, "_blank");
            } else {
                this.generatePdf(payment, i);
            }
        } else {
            this.generatePdf(payment, i);
        }
    }

    generatePdf(payment, i) {
        payment = this.service.printFacture(payment).subscribe(
            res => {
                if(res.success){
                    payment = res.data;

                    this.payments[i] = payment;

                    window.open(payment.facture, "_blank");
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

    paymentState(i) {
        var payment = this.payments[i];

        if (payment.status == true) {
            return "payée";
        } else {
            return "non payée";
        }
    }

}