import {Component, forwardRef, Inject} from 'angular2/core';
import {User} from "./user";
import {FormBuilder, Validators} from "angular2/common";
import {RegEx} from "../lib/regex";
import {UserFactory} from "./user.factory";
import {ControlGroup} from "angular2/common";
import {Router} from "angular2/router";


@Component({
    templateUrl: "app/User/user-profile.html",
    providers: [UserFactory]
})

export class UserProfileComponent {

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
        { "_id" : "56e9eb8076b8f3a707192676", "name" : "Younesta", "socialReason" : "YOUNESTA SARL", "adress" : "43 rue de malabry", "adress2" : "", "city" : "Maisse", "zipCode" : 91720, "mobile" : "06 50 90 12 05", "phone" : "01 60 78 37 94", "fax" : "01 60 78 37 94", "mail" : "younes.boulkaddid@supinternet.fr", "tva" : 0.9, "siret" : 987654567890987, "adeli" : 876545678987654, "nightBox" : true, "transporteur" : "Mathieu", "openDay" : "Lun", "closeDay" : "Lun", "openHour" : "1970-01-01T00:00:00Z", "closeHour" : "1970-01-01T00:00:00Z", "__v" : 0 },
        { "_id" : "56e9eb8076b8f3a707192678", "name" : "Younesta", "socialReason" : "YOUNESTA SARL", "adress" : "43 rue de malabry", "adress2" : "", "city" : "Maisse", "zipCode" : 91720, "mobile" : "06 50 90 12 05", "phone" : "01 60 78 37 94", "fax" : "01 60 78 37 94", "mail" : "younes.boulkaddid@supinternet.fr", "tva" : 0.9, "siret" : 987654567890987, "adeli" : 876545678987654, "nightBox" : true, "transporteur" : "Mathieu", "openDay" : "Lun", "closeDay" : "Lun", "openHour" : "1970-01-01T00:00:00Z", "closeHour" : "1970-01-01T00:00:00Z", "__v" : 0 }
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
