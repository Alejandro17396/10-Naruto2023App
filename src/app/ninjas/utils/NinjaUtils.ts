import { UserSetDTOResponse } from "src/app/sets/interfaces/set.interfaces";
import { ICreateUserNinja, NinjaUserFormationDTO } from "../interfaces/Ninja.interfaces";


export class NinjaUtils {


    static NinjaUserDTOToICreateNinjaUser(ninja:NinjaUserFormationDTO):ICreateUserNinja{
        let accesories: string [] = [];

        if(ninja.accesories && ninja.accesories.partes.length > 0)
            ninja.accesories.partes.forEach(element =>{
                accesories.push(element.nombre);
            });
        
        
        let partes: string [] = [];

        if(ninja.equipment && ninja.equipment.partes.length > 0)
            ninja.equipment.partes.forEach(element =>{
                partes.push(element.nombre);
            });
        

        let body:ICreateUserNinja;
        if(!ninja.equipment && !ninja.accesories){
            body = {
                name:ninja.nombre,
                ninja:ninja.ninja?.name,
            }
            return body;
        }

        if(!ninja.equipment){
            body = {
                name:ninja.nombre,
                ninja:ninja.ninja?.name,
                accesories:{
                    accesorieSetName:ninja.accesories.nombre,
                    accesories:accesories
                }
            }
            return body;
        }

        if(!ninja.accesories){
            body = {
                name:ninja.nombre,
                ninja:ninja.ninja?.name,
                set:{
                    setName:ninja.equipment.nombre,
                    equipment:partes
                }
            }
            return body;
        }

        body = {
            name:ninja.nombre,
            ninja:ninja.ninja?.name,
            accesories:{
                accesorieSetName:ninja.accesories.nombre,
                accesories:accesories
            },
            set:{
                setName:ninja.equipment.nombre,
                equipment:partes
            }
        }
        
        return body;
    }

    static UserSetDTOToICreateSet(set:UserSetDTOResponse){
        let partes: string [] = [];
        set.partes.forEach(response =>{
            partes.push(response.nombre);
        });
    }



}
