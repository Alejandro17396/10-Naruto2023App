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
}

export interface Parte {
    nombre: string;
    valor:  number;
    tipo:   Tipo;
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
