/**
 * Created by Younes on 06/04/2016.
 */
import {Injectable} from "angular2/core";

@Injectable()
export class AlertService {
    alerts:Array<Object> = [

    ];

    type = {
        500: {
            type: 'danger',
            msg: 'Une erreur est survenue. Veuillez essayer ultérieurement, si jamais cette erreur persiste contactez votre administrateur.'
        }
    };

   
    public addAlert(type, msg):void {
        if(typeof this.type[msg] === 'undefined'){
            this.alerts.push({type: type, msg: msg, closable: true});
        }else{
            this.alerts.push({type: this.type[msg].type, msg: this.type[msg].msg, closable: true});
        }

    }
}