import { ListaBonus } from "src/app/sets/interfaces/set.interfaces";

export interface AccesoriesResponsePaginated {
    content:          AccesorieSet[];
    pageable:         Pageable;
    totalElements:    number;
    totalPages:       number;
    last:             boolean;
    size:             number;
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}


export class AccesorieSet implements AccesorieSet{
    fechaSalida?: Date;
   constructor(public nombre: string, public partes: Parte[], public bonuses: ContentBonus[]) {}
    
    static createSetAux(){
   
        let url = {
            "nombre": "sakura accessories",
            "partes": [
                {
                    "nombre": "sakura amulet",
                    "valor": 53500,
                    "tipo": "chakra"
                },
                {
                    "nombre": "sakura bangle",
                    "valor": 55000,
                    "tipo": "agility"
                },
                {
                    "nombre": "sakura bracelet",
                    "valor": 55000,
                    "tipo": "agility"
                },
                {
                    "nombre": "sakura gloves",
                    "valor": 540000,
                    "tipo": "power"
                },
                {
                    "nombre": "sakura headband",
                    "valor": 53500,
                    "tipo": "force"
                },
                {
                    "nombre": "sakura necklace",
                    "valor": 53500,
                    "tipo": "force"
                },
                {
                    "nombre": "sakura pendant",
                    "valor": 53500,
                    "tipo": "chakra"
                },
                {
                    "nombre": "sakura ring",
                    "valor": 540000,
                    "tipo": "power"
                }
            ],
            "bonuses": [
                {
                    "tipo": "agility",
                    "bonuses": [
                        {
                            "nombreAtributo": "after be attack, decrease all enemies DMG rate by 20% for 2 round",
                            "valor": 1,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "agility",
                            "nombreSet": "sakura accessories"
                        },
                        {
                            "nombreAtributo": "avoid injury rate",
                            "valor": 20,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "agility",
                            "nombreSet": "sakura accessories"
                        }
                    ]
                },
                {
                    "tipo": "chakra",
                    "bonuses": [
                        {
                            "nombreAtributo": "after be attack, decrease all enemies ATK by 20% for 2 round",
                            "valor": 1,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "chakra",
                            "nombreSet": "sakura accessories"
                        },
                        {
                            "nombreAtributo": "HP",
                            "valor": 25,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "chakra",
                            "nombreSet": "sakura accessories"
                        }
                    ]
                },
                {
                    "tipo": "force",
                    "bonuses": [
                        {
                            "nombreAtributo": "after be attack, decrease the success rate of all enemies control skill by 25% for 2 round",
                            "valor": 1,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "force",
                            "nombreSet": "sakura accessories"
                        },
                        {
                            "nombreAtributo": "avoid injury rate",
                            "valor": 20,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "force",
                            "nombreSet": "sakura accessories"
                        }
                    ]
                },
                {
                    "tipo": "full set bonus",
                    "bonuses": [
                        {
                            "nombreAtributo": "after be attack, there has 50% chance to make self enter immune control state for 2 round",
                            "valor": 1,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "full set bonus",
                            "nombreSet": "sakura accessories"
                        },
                        {
                            "nombreAtributo": "weaken enemy attack",
                            "valor": 20,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "full set bonus",
                            "nombreSet": "sakura accessories"
                        }
                    ]
                },
                {
                    "tipo": "power",
                    "bonuses": [
                        {
                            "nombreAtributo": "after be attack, decrease all enemies final growth injury rate by 25% for 2 round",
                            "valor": 20,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "power",
                            "nombreSet": "sakura accessories"
                        },
                        {
                            "nombreAtributo": "HP",
                            "valor": 25,
                            "action": "increase",
                            "impact": "self",
                            "condition": "ninja is alive",
                            "time": "battle ends",
                            "tipoBonus": "power",
                            "nombreSet": "sakura accessories"
                        }
                    ]
                }
            ]
        };
      return Object.assign(new AccesorieSet("", [], []), url);
    }
}

export interface AccesorieSet {
    nombre:  string;
    partes:  Parte[];
    bonuses: ContentBonus[];
    
}

export interface ContentBonus {
    tipo:    Tipo;
    bonuses: ListaBonus[];
}

export interface BonusBonus {
    nombreAtributo: string;
    valor:          number;
    action:         string;
    impact:         string;
    condition:      string;
    time:           string;
    tipoBonus:      Tipo;
    nombreSet:      string;
}

export enum Tipo {
    Agility = "agility",
    Chakra = "chakra",
    Force = "force",
    FullSetBonus = "full set bonus",
    Power = "power",
    Merge = "merge"
}

export interface Parte {
    nombre: string;
    valor:  number;
    atributo: Atributo;
    tipo:   Tipo;
    image:   File|undefined;
    setName?: string;
}

export interface Atributo {
    nombre: string;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageSize:   number;
    pageNumber: number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}

export interface GenerateAccesorieSetsResponse {
    number: number;
    total:  number;
    sets:   AccesorieSet[];
}


export interface UserAccesorieSetDTO {
    id?:       number;
    nombre:   string;
    username?: string;
    partes:   Parte[];
    bonuses:  ContentBonus[];
}

export interface DeleteUserAccesorieSetDTO {
    code:       number;
    message:   string;
}

export enum TypeAccesorieItemSet{
    Armor = "amulet",
    Belt = "bangle",
    Boots = "bracelet",
    Coat = "gloves",
    Headband = "headband",
    Kunai = "necklace",
    Scroll = "pendant",
    Shuriken = "ring"
}

export interface ICreateUserAccesorieSet{
    id?:        number;
    accesorieSetName:   string ;
    accesories: string[];
}

export interface SaveAccesorieSet{
    set: AccesorieSet;
    attributes: string [];
}
/*export interface Set {
    nombre:  string;
    partes:  Array<Parte | null>;
    bonuses: SetBonus[];
}*/





