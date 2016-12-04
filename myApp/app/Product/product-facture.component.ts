import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ProductFactory} from "./product.factory";
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {TagInputComponent} from "angular2-tag-input";
import {Path} from "path";
import {childProcess} from "child_process";

@Component({
    providers: [],
    templateUrl: "app/Product/product-facture.html",
    directives: [ ACCORDION_DIRECTIVES ]

})

export class ProductPaymentComponent {

    payments: Object ;
    isOpen = [];
    loader = [];
    error = false;
    errorMessage = "no error message";

    constructor(public service: ProductFactory){
        this.service.getPayments()
            .subscribe(
                res => {
                    if(res.success){
                        this.payments = res.data;
                        for(var i in this.payments){
                            this.isOpen.push(false);
                            this.loader.push(true);
                            this.payments[i].date = new Date(this.payments[i].date);
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
        this.loader[i] = false;

        payment = this.service.printFacture(payment).subscribe(
            res => {
                if(res.success){
                    payment = res.data;

                    this.payments[i].facture = payment.facture;

                    this.loader[i] = true;
                    window.open(payment.facture, "_blank");
                }else{
                    this.errorMessage = res.message;
                    this.error = true;
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
    * 0 => unpaid
    * 1 => paid
    * */

    changeStatus(i) {

        var service = this.service;
        var payments = this.payments;

        setTimeout(function() {
            var payment = payments[i];
            payment = service.changePaymentStatus(payment._id, payment.status).subscribe(
                res => {
                    if(res.success){
                        //nothing
                    }else{
                        console.log(res);
                    }
                },
                err =>  console.log(err),
                () => console.log('payment updated')
            );
        }, 100);

    }

}