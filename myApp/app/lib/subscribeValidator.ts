import {Control} from "../../jspm_packages/npm/angular2@2.0.0-beta.15/ts/src/common/forms/model";
import {UserFactory} from "../User/user.factory";
import {Validator} from "../../jspm_packages/npm/angular2@2.0.0-beta.15/src/common/forms/directives/validators";
export class subscribeValidator {

    service: UserFactory ;

    constructor(userFactory: UserFactory){
        this.service = userFactory;
    }
 static usernameTaken(control: Control): Promise<Validator> {
     let q = new Promise((resolve, reject) => {
         setTimeout(() => {
             if (this.service.getUserByMail(control.value)) {
                 console.log('exists');
                 resolve({"usernameTaken": true});
             } else {
                 console.log('nope');
                 resolve(null);
             }
         }, 1000)
     });

     return q;
 }

}