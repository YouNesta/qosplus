export class Shop {
    private _name: string;
    private _adress: string;
    private _adress2: string;
    private _city: string;
    private _zipcode: number;
    private _mobile: number;
    private _phone: number;
    private _fax: number;
    private _email: string;

    constructor(name,adress, adress2,city,zipcode,mobile,phone,fax,email) {
        this._name = name;
        this._adress = adress;
        this._adress2 = adress2;
        this._city = city;
        this._zipcode = zipcode;
        this._mobile = mobile;
        this._phone = phone;
        this._fax = fax;
        this._email =email;
    }


    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    get adress():string {
        return this._adress;
    }

    set adress(value:string) {
        this._adress = value;
    }

    get city():string {
        return this._city;
    }

    set city(value:string) {
        this._city = value;
    }

    get zipcode():number {
        return this._zipcode;
    }

    set zipcode(value:number) {
        this._zipcode = value;
    }

    get mobile():number {
        return this._mobile;
    }

    set mobile(value:number) {
        this._mobile = value;
    }

    get phone():number {
        return this._phone;
    }

    set phone(value:number) {
        this._phone = value;
    }

    get fax():number {
        return this._fax;
    }

    set fax(value:number) {
        this._fax = value;
    }

    get email():string {
        return this._email;
    }

    set email(value:string) {
        this._email = value;
    }
}