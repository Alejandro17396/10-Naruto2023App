
export interface SetsResponsePaginated {
    content:          Set[];
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

export class Set {
    nombre:  string;
    partes:  Parte[];
    bonuses: Bonus[];
    present?:boolean;

    constructor(){
        this.nombre='Ejemplo';
        this.partes=[];
        this.bonuses=[];
    }
   
    static crearAuxSet(){
      let url = {
        "nombre": "amegakure set",
        "partes": [
            {
                "nombre": "amegakure armor",
                "atributo": {
                    "nombre": "physical defense"
                },
                "valor": 59000
            },
            {
                "nombre": "amegakure belt",
                "atributo": {
                    "nombre": "power"
                },
                "valor": 590000
            },
            {
                "nombre": "amegakure boots",
                "atributo": {
                    "nombre": "speed"
                },
                "valor": 59000
            },
            {
                "nombre": "amegakure coat",
                "atributo": {
                    "nombre": "strategy defense"
                },
                "valor": 59000
            },
            {
                "nombre": "amegakure headband",
                "atributo": {
                    "nombre": "physical defense"
                },
                "valor": 59000
            },
            {
                "nombre": "amegakure kunai",
                "atributo": {
                    "nombre": "physical attack"
                },
                "valor": 59000
            },
            {
                "nombre": "amegakure scroll",
                "atributo": {
                    "nombre": "strategy attack"
                },
                "valor": 59000
            },
            {
                "nombre": "amegakure shuriken",
                "atributo": {
                    "nombre": "physical attack"
                },
                "valor": 59000
            }
        ],
        "bonuses": [
            {
                "nombre": "2 effect : ",
                "listaBonus": [
                    {
                        "nombreAtributo": "attack",
                        "valor": 25,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    },
                    {
                        "nombreAtributo": "damage rate",
                        "valor": 20,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    },
                    {
                        "nombreAtributo": "force",
                        "valor": 10000,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    },
                    {
                        "nombreAtributo": "punch rate",
                        "valor": 30,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    }
                ]
            },
            {
                "nombre": "4 effect : ",
                "listaBonus": [
                    {
                        "nombreAtributo": "after release skill has 80% chance to make 2 random enemies enter frozen for 2 rounds",
                        "valor": 0,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    },
                    {
                        "nombreAtributo": "damage rate",
                        "valor": 20,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    },
                    {
                        "nombreAtributo": "increase cc rate",
                        "valor": 40,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    }
                ]
            },
            {
                "nombre": "6 effect : ",
                "listaBonus": [
                    {
                        "nombreAtributo": "after release skill dispel 2 random allies debuff",
                        "valor": 0,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    },
                    {
                        "nombreAtributo": "agility",
                        "valor": 50000,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    },
                    {
                        "nombreAtributo": "weaken enemy attack",
                        "valor": 30,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends"
                    }
                ]
            }
        ]
    };
      
          return Object.assign(new Set(), url);
    }

}

export interface Bonus {
    nombre:     string;
    listaBonus: ListaBonus[];
}

export enum EffectEnum {
    Two = "2 effect: ",
    Four = "4 effect: ",
    Six = "6 effect: "
  }

export enum TypeItemSet{
    Armor = "armor",
    Belt = "belt",
    Boots = "boots",
    Coat = "coat",
    Headband = "headband",
    Kunai = "kunai",
    Scroll = "scroll",
    Shuriken = "shuriken"
}

export class ListaBonus {
    
    
    nombreAtributo: string;
    valor:          number;
    action:         string;
    impact:         string;
    condition:      string;
    time:           string;

    constructor(){
        this.nombreAtributo = '';
        this.action= "";
        this.impact= "";
        this.condition= "";
        this.time= "";
        this.valor = 0;
    }
}

export interface Parte {
    nombre:   string;
    atributo: Atributo;
    valor:    number;
    setName:  string;
}

export interface Atributo {
    nombre: string;
}


export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}

export interface Filters {
    order:boolean;
    filter:boolean;
    set:string;
}


export interface GenerateSetsResponse {
    number: number;
    sets:   Set[];
}

export interface ICreateUserSet{
    id?:        number;
    setName:   string;
    equipment: string[];
}

export interface UserSetDTOResponse {
    id:       number;
    nombre:   string;
    username: string;
    partes:   Parte[];
    bonuses:  Bonus[];
}

export interface DeleteUserSetDTOResponse {
    code:       number;
    message:   string;
}

export interface ErrorResponse {
    code:    string;
    message: string;
}