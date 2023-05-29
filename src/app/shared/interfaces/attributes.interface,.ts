export class Attribute {
    nombre: string;

    constructor(nombre:string){
        this.nombre=nombre;
    }
}

export interface SaveElement{
    type:string;
    name:string;
}

export class BonusAttribute {
    name: string;
    value: number
    constructor(name:string,value:number){
        this.name=name;
        this.value=value;
    }
}

export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
  }