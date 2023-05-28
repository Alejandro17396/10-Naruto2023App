import { AccesorieSet, Tipo } from 'src/app/accesories/interfaces/accesories.interfaces';
import { ListaBonus } from '../interfaces/set.interfaces';
import { Attribute } from 'src/app/ninjas/interfaces/Ninja.interfaces';


export class ListaBonusUtils {


    static AttributeNinjaToListaBonus(attribute:Attribute):ListaBonus{
        let response :ListaBonus = {
            nombreAtributo:attribute.attributeName,
            valor:attribute.value,
            action:attribute.action,
            impact:attribute.impact,
            condition:attribute.condition,
            time:attribute.time
        }
        return response; 
    }

    static ListaBonusToAttributeNinja(attribute:ListaBonus):Attribute{
        let response :Attribute = {
            attributeName:attribute.nombreAtributo,
            value:attribute.valor,
            action:attribute.action,
            impact:attribute.impact,
            condition:attribute.condition,
            time:attribute.time,
            color:"green"
        }
        return response; 
    }

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

    static MergeNinjaTalentAttributes(attributes : Attribute[]):Attribute[]{
        let mapa: Map<string,Attribute> = new Map<string,Attribute>();
        attributes.forEach(
            attribute =>{
                var cad = ListaBonusUtils.getKeyAttributeNotTime(attribute);
                let exist  = mapa.get(cad);
                if(exist){
                    exist.value += attribute.value;
                    mapa.set(cad,exist);
                }else{
                    mapa.set(cad,JSON.parse(JSON.stringify(attribute)));
                }
            }
        );

        let result:Attribute[] = Array.from(mapa.values());
        return result;
    }

    static getKeyAttributeNotTime(attribute:Attribute){
        return JSON.stringify(attribute, function(key, value) {
            var excludedFields = ["time","value"];
           if (excludedFields.indexOf(key) !== -1) {
              return undefined;
            }
            return value;
        });
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
