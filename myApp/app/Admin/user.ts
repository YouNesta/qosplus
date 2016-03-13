export class Admin {
    private _id: number;
    private _role: number;
    private _lastName: string;
    private _firstName: string;
    private _phone: string;
    private _mail: string;
    private _password: string;


    constructor(user) {
        this._role = 1;
        this._lastName = user.lastName;
        this._firstName = user.firstName;
        this._mail = user.mail;
        this._phone = user.phone;
    }


    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get role():number {
        return this._role;
    }

    set role(value:number) {
        this._role = value;
    }

    get lastName():string {
        return this._lastName;
    }

    set lastName(value:string) {
        this._lastName = value;
    }

    get firstName():string {
        return this._firstName;
    }

    set firstName(value:string) {
        this._firstName = value;
    }

    get phone():string {
        return this._phone;
    }

    set phone(value:string) {
        this._phone = value;
    }

    get mail():string {
        return this._mail;
    }

    set mail(value:string) {
        this._mail = value;
    }

    get password():string {
        return this._password;
    }

    set password(value:string) {
        this._password = value;
    }
}