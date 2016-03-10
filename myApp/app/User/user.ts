import {Shop} from "../Shop/shop";
export class User {
    private _id: number;
    private _lastname: string;
    private _firstname: string;
    private _phone: number;
    private _mail: string;
    private _socialReason: string;
    private _shop: Shop;
    private _director: User;
    private _tva: number;
    private _siret: number;
    private _adeli: number;
    private _nightBox: boolean;
    private _financialShop: Shop;
    private _IBAN: number;
    private _BIC: number;
    private _fiancialMail: string;
    private _paymentDate: boolean;
    private _deliverShop: Shop;
    private _central: string;


    constructor(user) {
        this._lastname = user.lastname;
        this._firstname = user.firstname;
        this._mail = user.mail;
        this._phone = user.phone;
        this._shop = user.shop;
    }


    get id():number {
        return this._id;
    }

    set id(value:number) {
        this._id = value;
    }

    get socialReason():string {
        return this._socialReason;
    }

    set socialReason(value:string) {
        this._socialReason = value;
    }

    get mail():string {
        return this._mail;
    }

    set mail(value:string) {
        this._mail = value;
    }

    get lastname():string {
        return this._lastname;
    }

    set lastname(value:string) {
        this._lastname = value;
    }

    get firstname():string {
        return this._firstname;
    }

    set firstname(value:string) {
        this._firstname = value;
    }

    get phone():number {
        return this._phone;
    }

    set phone(value:number) {
        this._phone = value;
    }

    get shop():Shop {
        return this._shop;
    }

    set shop(value:Shop) {
        this._shop = value;
    }

    get director():User {
        return this._director;
    }

    set director(value:User) {
        this._director = value;
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

    get financialShop():Shop {
        return this._financialShop;
    }

    set financialShop(value:Shop) {
        this._financialShop = value;
    }

    get IBAN():number {
        return this._IBAN;
    }

    set IBAN(value:number) {
        this._IBAN = value;
    }

    get BIC():number {
        return this._BIC;
    }

    set BIC(value:number) {
        this._BIC = value;
    }

    get fiancialMail():number {
        return this._fiancialMail;
    }

    set fiancialMail(value:number) {
        this._fiancialMail = value;
    }

    get paymentDate():boolean {
        return this._paymentDate;
    }

    set paymentDate(value:boolean) {
        this._paymentDate = value;
    }

    get deliverShop():Shop {
        return this._deliverShop;
    }

    set deliverShop(value:Shop) {
        this._deliverShop = value;
    }

    get central():string {
        return this._central;
    }

    set central(value:string) {
        this._central = value;
    }
}