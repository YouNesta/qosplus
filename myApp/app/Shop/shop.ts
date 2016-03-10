export class Shop {
    private _name: string;
    private _adress: string;
    private _adress2: string;
    private _city: string;
    private _zipCode: number;
    private _mobile: number;
    private _phone: number;
    private _fax: number;
    private _mail: string;

    constructor(shop) {
        this._name = shop.name;
        this._adress = shop.adress;
        this._adress2 = shop.adress2;
        this._city = shop.city;
        this._zipCode = shop.zipCode;
        this._mobile = shop.mobile;
        this._phone = shop.phone;
        this._fax = shop.fax;
        this._mail = shop.mail;
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

    get zipCode():number {
        return this._zipCode;
    }

    set zipCode(value:number) {
        this._zipCode = value;
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

    get mail():string {
        return this._mail;
    }

    set mail(value:string) {
        this._mail = value;
    }
}