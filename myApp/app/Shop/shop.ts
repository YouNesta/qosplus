export class Shop {
    private _id: number;
    private _name: string;
    private _socialReason: string;
    private _adress: string;
    private _adress2: string;
    private _city: string;
    private _zipCode: number;
    private _mobile: number;
    private _phone: number;
    private _fax: number;
    private _mail: string;
    private _tva: number;
    private _siret: number;
    private _adeli: number;
    private _nightBox: boolean;
    private _transporteur: string;
    private _openDay: string ;
    private _closeDay: string ;
    private _openHour: string ;
    private _closeHour: string ;

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


    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    get socialReason():string {
        return this._socialReason;
    }

    set socialReason(value:string) {
        this._socialReason = value;
    }

    get adress():string {
        return this._adress;
    }

    set adress(value:string) {
        this._adress = value;
    }

    get adress2():string {
        return this._adress2;
    }

    set adress2(value:string) {
        this._adress2 = value;
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

    get tva():number {
        return this._tva;
    }

    set tva(value:number) {
        this._tva = value;
    }

    get siret():number {
        return this._siret;
    }

    set siret(value:number) {
        this._siret = value;
    }

    get adeli():number {
        return this._adeli;
    }

    set adeli(value:number) {
        this._adeli = value;
    }

    get nightBox():boolean {
        return this._nightBox;
    }

    set nightBox(value:boolean) {
        this._nightBox = value;
    }

    get transporteur():string {
        return this._transporteur;
    }

    set transporteur(value:string) {
        this._transporteur = value;
    }

    get openDay():string {
        return this._openDay;
    }

    set openDay(value:string) {
        this._openDay = value;
    }


    get closeDay():string {
        return this._closeDay;
    }

    set closeDay(value:string) {
        this._closeDay = value;
    }

    get openHour():string {
        return this._openHour;
    }

    set openHour(value:string) {
        this._openHour = value;
    }


    get closeHour():string {
        return this._closeHour;
    }

    set closeHour(value:string) {
        this._closeHour = value;
    }
}