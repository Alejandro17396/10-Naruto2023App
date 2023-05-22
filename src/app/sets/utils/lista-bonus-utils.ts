import { AccesorieSet, Tipo } from 'src/app/accesories/interfaces/accesories.interfaces';
import { ListaBonus } from '../interfaces/set.interfaces';


export class ListaBonusUtils {


    static mergeBonusesAccesorieSet(set:AccesorieSet):AccesorieSet{
        let list :ListaBonus [] = [];
        set.bonuses.forEach(bonus =>{
            list.push(...bonus.bonuses);
        });
        set.bonuses = [{tipo:Tipo.Merge, bonuses:this.mergeListBonus(list)}];
        return set;
    }


    static mergeListBonus(list:ListaBonus[]):ListaBonus[] {
        let mapa: Map<string,ListaBonus> = new Map<string,ListaBonus>();
        let listAux :ListaBonus[] = JSON.parse(JSON.stringify(list)); 
        let returnList : ListaBonus[] = [];
        listAux.forEach(bonus => {
            let exist =  mapa.get(this.createKeyListaBonus(bonus));
            if(exist){
                exist.valor += bonus.valor;
                mapa.set(this.createKeyListaBonus(bonus),exist);
            }else{
                mapa.set(this.createKeyListaBonus(bonus),bonus);
                returnList.push(bonus);
            }
        });

        return returnList;
    }

    static equals(l1:ListaBonus,l2:ListaBonus):number{

        if(l1.nombreAtributo != l2.nombreAtributo){
            return 1;
        }

        if(l1.valor != l2.valor){
            return 1;
        }

        if(l1.action != l2.action){
            return 1;
        }

        if(l1.impact != l2.impact){
            return 1;
        }

        if(l1.condition != l2.condition){
            return 1;
        }

        return -1;
    }

    static equalsNameAndValue(l1:ListaBonus,l2:ListaBonus):boolean{

        if(l1.nombreAtributo != l2.nombreAtributo){
            return false;
        }

        if(l1.valor != l2.valor){
            return false;
        }

        return true;
    }


    static createKeyListaBonus(obj:ListaBonus):string{
        return JSON.stringify({
            nombreAtributo: obj.nombreAtributo,
            action: obj.action,
            impact: obj.impact,
            condition: obj.condition
          });
    }

    static createKeyListaBonusByNameAndValue(obj:ListaBonus):string{
        return JSON.stringify({
            nombreAtributo: obj.nombreAtributo,
            valor: obj.valor
          });
    }

    static parseStringToListaBonus(obj:string):ListaBonus{
        return Object.assign(new ListaBonus(), obj);
    }
}
