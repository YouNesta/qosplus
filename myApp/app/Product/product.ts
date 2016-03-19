export class Product {
    private _id:number;
    private _name:string;
    private _material:number;
    private _color:number;
    private _hydrophily:number;
    private _diameter:Array<number>;
    private _radius:Array<number>;
    private _sphere:Array<number>;
    private _cylinder:Array<number>;
    private _axis:Array<number>;
    private _addition:Array<number>;
    private _stock:Array<number>;


    constructor(product) {
        this._name = product.name;
        this._material = product.material;
        this._color = product.color;
        this._hydrophily = product.hydrophily;
        this._diameter = product.diameter;
        this._radius = product.radius;
        this._sphere = product.sphere;
        this._cylinder = product.cylinder;
        this._axis = product.axis;
        this._addition = product.addition;
        this._stock = product.stock;
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

    get diameter():Array<number> {
        return this._diameter;
    }

    set diameter(value:Array<number>) {
        this._diameter = value;
    }

    get radius():Array<number> {
        return this._radius;
    }

    set radius(value:Array<number>) {
        this._radius = value;
    }

    get sphere():Array<number> {
        return this._sphere;
    }

    set sphere(value:Array<number>) {
        this._sphere = value;
    }

    get addition():Array<number> {
        return this._addition;
    }

    set addition(value:Array<number>) {
        this._addition = value;
    }

    get axis():Array<number> {
        return this._axis;
    }

    set axis(value:Array<number>) {
        this._axis = value;
    }

    get cylinder():Array<number> {
        return this._cylinder;
    }

    set cylinder(value:Array<number>) {
        this._cylinder = value;
    }

    get stock():Array<number> {
        return this._stock;
    }

    set stock(value:Array<number>) {
        this._stock = value;
    }
}