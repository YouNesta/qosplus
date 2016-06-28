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
        lastName: 'Loscil',
        firstName: 'Medru',
        phone: '06.59.90.12.05',
        mail: 'younes.boulkaddid@supinternet.fr',
        IBAN: '12345678',
        BIC: '1234578',
        associateShop: []
    };

    shops = [
        { "_id" : "56e9eb8076b8f3a707192676", "name" : "Younesta", "socialReason" : "YOUNESTA SARL", "adress" : "43 rue de malabry", "adress2" : "", "city" : "Maisse", "zipCode" : 91720, "mobile" : "06 50 90 12 05", "phone" : "01 60 78 37 94", "fax" : "01 60 78 37 94", "mail" : "younes.boulkaddid@supinternet.fr", "tva" : 0.9, "siret" : 987654567890987, "adeli" : 876545678987654, "nightBox" : true, "transporteur" : "Mathieu",
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
            "__v" : 0 },
        { "_id" : "56e9eb8076b8f3a707192678", "name" : "Younesta", "socialReason" : "YOUNESTA SARL", "adress" : "43 rue de malabry", "adress2" : "", "city" : "Maisse", "zipCode" : 91720, "mobile" : "06 50 90 12 05", "phone" : "01 60 78 37 94", "fax" : "01 60 78 37 94", "mail" : "younes.boulkaddid@supinternet.fr", "tva" : 0.9, "siret" : 987654567890987, "adeli" : 876545678987654, "nightBox" : true, "transporteur" : "Mathieu", "openDay" : "Lun", "closeDay" : "Lun", "openHour" : "1970-01-01T00:00:00Z", "closeHour" : "1970-01-01T00:00:00Z", disponibility: [{
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
            },
            {
                day: "Samedi",
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
            }], "__v" : 0 }
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
        var price = 1537;
        for (var i = 0; i < this.commands.length; i++) {
            //stuff
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

