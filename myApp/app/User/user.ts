import {Shop} from "../Shop/shop";
export class User {
    private _id: number;
    private _role: number;
    private _lastName: string;
    private _firstName: string;
    private _phone: string;
    private _mail: string;
    private _shop: Shop;
    private _director: User;
    private _associateShop: Array<number> ;
    private _averageLens: number ;
    private _providerLens: string ;
    private _averageGlasses: number ;
    private _providerGlasses: string ;
    private _commercial: string;
    private _financialShop: Shop;
    private _IBAN: number;
    private _BIC: number;
    private _financialMail: string;
    private _paymentState: boolean;
    private _deliverShop: Shop;
    private _central: string;


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

    get mail():string {
        return this._mail;
    }

    set mail(value:string) {
        this._mail = value;
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

    get associateShop():Array<number> {
        return this._associateShop;
    }

    set associateShop(value:Array<number>) {
        this._associateShop = value;
    }

    get averageLens():number {
        return this._averageLens;
    }

    set averageLens(value:number) {
        this._averageLens = value;
    }

    get providerLens():string {
        return this._providerLens;
    }

    set providerLens(value:string) {
        this._providerLens = value;
    }

    get averageGlasses():number {
        return this._averageGlasses;
    }

    set averageGlasses(value:number) {
        this._averageGlasses = value;
    }

    get providerGlasses():string {
        return this._providerGlasses;
    }

    set providerGlasses(value:string) {
        this._providerGlasses = value;
    }

    get commercial():string {
        return this._commercial;
    }

    set commercial(value:string) {
        this._commercial = value;
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

    get financialMail():string {
        return this._financialMail;
    }

    set financialMail(value:string) {
        this._financialMail = value;
    }

    get paymentState():boolean {
        return this._paymentState;
    }

    set paymentState(value:boolean) {
        this._paymentState = value;
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