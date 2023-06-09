import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccesoriesService } from '../../services/accesories.service';
import { SetItemsService } from 'src/app/sets/services/set-items-service.service';
import { Router } from '@angular/router';
import { AccesoriesSharedDataService } from 'src/app/shared/services/accesories-shared-data.service';
import { AccesorieSet, ContentBonus, ICreateUserAccesorieSet, Parte, Tipo, TypeAccesorieItemSet, UserAccesorieSetDTO } from '../../interfaces/accesories.interfaces';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { concatMap } from 'rxjs';
import { AccesorieSetItemsService } from '../../services/accesorie-set-items.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-own-accesories-set',
  templateUrl: './create-own-accesories-set.component.html',
  styleUrls: ['./create-own-accesories-set.component.css'],
  providers: [MessageService]
})
export class CreateOwnAccesoriesSetComponent implements OnInit{

  ngOnInit(): void {

    this.accesoriesService.getAccesories().pipe(
      concatMap((response) => {
        response.content.forEach((set) => {
          this.accesoriesMap.set(set.nombre, set);
          this.accesories.push(set);
          //let bonus: ContentBonus[] = set.bonuses;
          set.bonuses.forEach((bonus) => {
            if (bonus.tipo === Tipo.Agility) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.Power) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.Chakra) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.Force) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.FullSetBonus) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
          });
          set.partes.forEach((item) => {
            this.accesoriesByItemMap.set(item.nombre, set);
          });
        });
        return this.accesorieSetItemsService.getSetItems();
      }),
      concatMap((response) => {
        this.items = response;
        this.rechargeItemsList = false;
        setTimeout(() => {
          this.rechargeItemsList = true;
        }, 0);
        return this.accesoriesDataSharedService.getUserSetToModify;
      })
    ).subscribe((response) => {
      if (response) {
        response.partes.forEach((item) => {
          this.items.forEach((it) => {
            if (it.nombre === item.nombre) {
              this.addSetItem(it);
            }
          });
        });
        this.setName = response.nombre;
      }
    });

  }

  items: Parte[]= [];
  selectedItem !: Parte;
  rechargeItemsList : boolean = true;
  accesorieSet : AccesorieSet = new AccesorieSet("",[],[]);
  accesories:AccesorieSet[] = [];
  accesoriesMap: Map<string, AccesorieSet> =new Map<string, AccesorieSet>();
  bonusesMap: Map<string, ContentBonus> =new Map<string, ContentBonus>();
  accesoriesByItemMap: Map<string, AccesorieSet> =new Map<string, AccesorieSet>(); 
  listaBonus: ListaBonus[] = [];
  typeItemsAdded:string [] = [];
  //typeItemsAdded2:Set<Tipo>= new Set<Tipo>();
  setName:string ='';
  setToModifyName?:string;
  userSetToModify?:Parte[] = [];

  constructor( private accesoriesService:AccesoriesService,
    private accesorieSetItemsService:AccesorieSetItemsService,
    private router:Router,
    private accesoriesDataSharedService:AccesoriesSharedDataService,
    private messageService: MessageService){}

    filter(elemento:any,elemento2:any){
      if(elemento.target.value){
        elemento2.filter(elemento.target.value,'nombre', 'contains');
      }else{
        elemento2.filter(" ",'nombre', 'contains');
      }
    }

    addToSet<T>(set: Set<T>, element: T): boolean {
      const initialSize = set.size;
      set.add(element);
      return set.size !== initialSize;
    }
  
    
    addSetItem(item:Parte){
      let type;
      for(let key of Object.values(TypeAccesorieItemSet)){
        if(item.nombre.includes(key)){
          type = key;
          if(this.typeItemsAdded.includes(key)){
            return;
          }
          this.typeItemsAdded.push(type);
          break;
        }
      }
      if(this.accesorieSet.partes.length < 8 ){
        let setName = this.accesoriesByItemMap.get(item.nombre)?.nombre;
        if(setName){
        item.setName =setName;
        this.accesorieSet.partes.push(item);
        this.calculateBonuses(this.accesorieSet.partes);
        }
      }
    }

    deleteSetItem(item:Parte){
      const resultado = this.accesorieSet.partes.filter(setItem => setItem.nombre != item.nombre);
      let itemToDelete = this.accesorieSet.partes.find(elem => elem.nombre == item.nombre);
      if(itemToDelete){
        for(let key of Object.values(TypeAccesorieItemSet)){
          if(itemToDelete.nombre.includes(key)){
            this.typeItemsAdded = this.typeItemsAdded.filter(type => type != key);
          }
        }
      }
      
      this.accesorieSet.partes = resultado;
      this.calculateBonuses(this.accesorieSet.partes);
    }
    
  
    calculateBonuses(partes: Parte[]) {
  
      let mapa: Map<string,number> = new Map<string,number>();
      partes.forEach(item =>{
        let num = mapa.get(item.tipo + " " + item.setName);
        if(num){
          mapa.set(item.tipo + " " + item.setName,(num+1));
        }else{
          mapa.set(item.tipo + " " + item.setName,1);
        }
      });
  
      this.findBonuses(mapa,this.isFullSet(partes));
      //this.prueba();
    }

    isFullSet(partes:Parte[]){
      let setN:string|undefined = partes[0].setName;
      let returnValue:string | undefined = Tipo.FullSetBonus+" "+partes[0].setName;
      let cont = 0;
      partes.forEach(item =>{
            if(setN === item.setName){
             cont++;
            }
      });
      if(cont == 8){
        return returnValue;
      }else{
        return undefined;
      }
      
    }
  
    findBonuses(mapa: Map<string, number>,isFull:string|undefined) {
      let listBonusL : ListaBonus [] = [];
      mapa.forEach((key,value)=>{
          let num = Number(key);
          if(num == 2){
            let bonus = this.bonusesMap.get(value);
            if(bonus){
              let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.bonuses));
              listBonusL.push(...listaAux);
            }
          }
  
          if(num >= 4){
            let bonus = this.bonusesMap.get("4 "+value);
            if(bonus){
              let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.bonuses));
              listBonusL.push(...listaAux);
            }
          }
  
          if(num >= 6){
            let bonus = this.bonusesMap.get("6 "+value);
            if(bonus){
              let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.bonuses));
              listBonusL.push(...listaAux);
            }
          }
      });

      if(isFull){
        let bonus = this.bonusesMap.get(isFull);
            if(bonus){
              let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.bonuses));
              listBonusL.push(...listaAux);
            }
      }
      this.listaBonus = ListaBonusUtils.mergeListBonus(listBonusL);
  
    }

    updateSet(){
      if(this.items.length>0 && this.setName && this.setName.length > 6 ){
        let itemsName:string [] = [];
        this.accesorieSet.partes.forEach( item => itemsName.push(item.nombre));
        let body : ICreateUserAccesorieSet = {
          accesorieSetName:this.setName,
          accesories:itemsName
        }
        this.accesoriesService.updateUserSet(body).subscribe(
          /*response => {
            console.log(response.status);
          }*/
          (response: HttpResponse<UserAccesorieSetDTO>) => {
            const statusCode = response.status; // Código de respuesta
            console.log(statusCode);
            // Resto del manejo de la respuesta
            this.showSuccess("Set "+ this.setName +" updated succesfully");
          },
          (error) =>{
            this.showError(error.error.message);
          }
        );
       }else{
        this.showError("Cant update the set name must have 6 characters and 6 items");
       }
    }
  
    saveSet(){
      if(this.items.length>0 && this.setName && this.setName.length > 6 ){
        let itemsName:string [] = [];
        this.accesorieSet.partes.forEach( item => itemsName.push(item.nombre));
        let body : ICreateUserAccesorieSet = {
          accesorieSetName:this.setName,
          accesories:itemsName
        }
        this.accesoriesService.createUserSet(body).subscribe(
          /*response => {
            console.log(response.status);
          }*/
          (response: HttpResponse<UserAccesorieSetDTO>) => {
            const statusCode = response.status; // Código de respuesta
            console.log(statusCode);
            // Resto del manejo de la respuesta
            this.showSuccess("Set " + this.setName + " saved succesfully");
          },
          (error) =>{
            console.log(error.error);
            this.showError(error.error.message);
          }
        );
       }else{
        this.showError("Cant save the set name must have 6 characters and 6 items");
       }
    }
  
    showSuccess(text:string) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
    }
  
    showError(text:string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
    }

}
