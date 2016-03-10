import {Injectable} from "angular2/core";
@Injectable()

export class RegEx {
    private _Phone = {
        french:{
            mobile: "",
            fix: '^((\\+|00)33\\s?|0)[1-5|9](\\s?\\d{2}){4}$'
        }
    };

    private _Email = "^(\\w[-._+\\w]*\\w@\\w[-._\\w]*\\w\\.\\w{2,3})$";


    get Phone():{french: {mobile: string, fix: string}} {
        return this._Phone;
    }

    get Email():string {
        return this._Email;
    }
}