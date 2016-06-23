import {Component, forwardRef, Inject} from 'angular2/core';
import {Alert} from "ng2-bootstrap/ng2-bootstrap";
import {CORE_DIRECTIVES} from 'angular2/common';
import {Injectable} from 'angular2/core';
import {AlertService} from './alert';
@Injectable()



@Component({
    selector: "alert",
    templateUrl: "app/Tools/alert.html",
    directives: [Alert, CORE_DIRECTIVES],
    providers: [AlertService]

})

export class AlertComponent  {
    alerts:Array<Object>;
    public closeAlert(i:number):void {
        this.alerts.splice(i, 1);
    }
    constructor(@Inject(forwardRef(() => AlertService)) alertService) {
        this.alerts = alertService.alerts
    }

 

}
