import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserFactory} from "./user.factory";
import {ProductFactory} from "../Product/product.factory"
import {ACCORDION_DIRECTIVES} from "ng2-bootstrap";
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from "angular2/router";
@CanActivate(() => tokenNotExpired('token'))

@Component({
    providers: [],
    templateUrl: "app/User/user-dashboard.html",
    directives: [ ACCORDION_DIRECTIVES ],
    providers: []
})



export class UserDashboardComponent {

    user = {
        lastName: '',
        firstName: '',
        phone: '',
        mail: '',
        IBAN: '',
        BIC: '',
        associateShop: []
    };

    shops = [
        { "_id" : "",
            "name" : "",
            "socialReason" : "",
            "adress" : "",
            "adress2" : "",
            "city" : "",
            "zipCode" : 0,
            "mobile" : "",
            "phone" : "",
            "fax" : "",
            "mail" :
            "",
            "tva" : 0,
            "siret" : 0,
            "adeli" : 0,
            "nightBox" : true,
            "transporteur" : "",
            disponibility: [{
                day: "Lundi",
                data: {
                    morning: {
                        opening: new Date(),
                        closing: new Date()
                    },
                    afternoon: {
                        opening: new Date(),
                        closing: new Date()
                    }
                }
            },
                {
                    day: "Mardi",
                    data: {
                        morning: {
                            opening: new Date(),
                            closing: new Date()
                        },
                        afternoon: {
                            opening: new Date(),
                            closing: new Date()
                        }
                    }
                },
                {
                    day: "Mercredi",
                    data: {
                        morning: {
                            opening: new Date(),
                            closing: new Date()
                        },
                        afternoon: {
                            opening: new Date(),
                            closing: new Date()
                        }
                    }
                },
                {
                    day: "Jeudi",
                    data: {
                        morning: {
                            opening: new Date(),
                            closing: new Date()
                        },
                        afternoon: {
                            opening: new Date(),
                            closing: new Date()
                        }
                    }
                },
                {
                    day: "Vendredi",
                    data: {
                        morning: {
                            opening: new Date(),
                            closing: new Date()
                        },
                        afternoon: {
                            opening: new Date(),
                            closing: new Date()
                        }
                    }
                }],
            "__v" : 0 }
    ];

    commands = [];

    constructor(public service: UserFactory, public router: Router){
        var user = JSON.parse(localStorage.getItem("user"));
        service.getUserByMail(user.mail).subscribe(
            res => {
                if(res.success){
                    this.user = res.data;
                    service.getShops(this.user.associateShop).subscribe(
                        res => {
                            if(res.success){
                                this.shops = res.data;
                                for (var i = 0; i < this.shops.length; i++) {
                                    for (var j = 0; j < this.shops[i].disponibility.length; j++) {
                                        this.shops[i].disponibility[j].data.morning.opening = new Date(this.shops[i].disponibility[j].data.morning.opening);
                                        this.shops[i].disponibility[j].data.morning.closing = new Date(this.shops[i].disponibility[j].data.morning.closing);
                                        this.shops[i].disponibility[j].data.afternoon.opening = new Date(this.shops[i].disponibility[j].data.afternoon.opening);
                                        this.shops[i].disponibility[j].data.afternoon.closing = new Date(this.shops[i].disponibility[j].data.afternoon.closing);
                                    }
                                }
                            }else{
                                console.log(res.message);
                            }
                        },
                        err => {
                            console.log("error");
                        }
                    );
                    service.getUserCommands(this.user).subscribe(
                        res => {
                            if(res.success){
                                this.commands = res.data;
                            }else{
                                console.log(res.message);
                            }
                        },
                        err => {
                            console.log("error");
                        }
                    );
                }else{
                    console.log(res.message);
                }
            },
            err => {
                console.log("error");
            }
        );
    }

    getPrice() {
        var price = 0;
        for (var i in this.commands) {
            var command = this.commands[i];
            if (command.status != 0 && command.status != 3) {
                price += command.amount;
            }
        }
        return price;
    }

    getValidated() {
        var validated = 0;
        for (var i = 0; i < this.commands.length; i++) {
            if (this.commands[i].status == 0) {
                validated++;
            }
        }
        return validated;
    }
}

