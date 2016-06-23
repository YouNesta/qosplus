export class Product {
    private _id:number;
    private _name:string;
    private _material:number;
    private _color:number;
    private _hydrophily:number;
    private _products:Array<Array>;


    constructor(product) {
        this._name = product.name;
        this._material = product.material;
        this._color = product.color;
        this._hydrophily = product.hydrophily;
        this._products = product.products;
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

    get material():number {
        return this._material;
    }

    set material(value:number) {
        this._material = value;
    }

    get color():number {
        return this._color;
    }

    set color(value:number) {
        this._color = value;
    }

    get hydrophily():number {
        return this._hydrophily;
    }

    set hydrophily(value:number) {
        this._hydrophily = value;
    }

    get products():Array<Array> {
        return this._products;
    }

    set products(value:Array<Array>) {
        this._products = value;
    }

}