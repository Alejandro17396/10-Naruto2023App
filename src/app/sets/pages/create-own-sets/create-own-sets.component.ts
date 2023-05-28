import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetSharedDataService } from 'src/app/shared/services/set-shared-data.service';
import { SetsService } from '../../services/sets.service';
import { MessageService } from 'primeng/api';
import { Bonus, ListaBonus, Parte,Set,EffectEnum, TypeItemSet, ICreateUserSet, UserSetDTOResponse, ErrorResponse } from '../../interfaces/set.interfaces';
import { BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { SetItemsService } from '../../services/set-items-service.service';
import { ListaBonusUtils } from '../../utils/lista-bonus-utils';
import { HttpResponse } from '@angular/common/http';
import { concat, concatMap, tap } from 'rxjs';


@Component({
  selector: 'app-create-own-sets',
  templateUrl: './create-own-sets.component.html',
  styleUrls: ['./create-own-sets.component.css'],
  providers: [MessageService]
})
export class CreateOwnSetsComponent implements OnInit{

  items: Parte[]= [];
  selectedItem !: Parte;
  rechargeItemsList : boolean = true;
  set : Set = new Set();
  sets:Set[] = [];
  setsMap: Map<string, Set> =new Map<string, Set>();
  bonusesMap: Map<string, Bonus> =new Map<string, Bonus>();
  setsByItemMap: Map<string, Set> =new Map<string, Set>(); 
  listaBonus: ListaBonus[] = [];
  typeItemsAdded:string [] = [];
  setName:string ='';
  setToModifyName?:string;
  userSetToModify?:Parte[] = [];

  

  ngOnInit(): void {

    this.setService.getSets().pipe(
      concatMap((response) => {
        response.content.forEach((set) => {
          this.setsMap.set(set.nombre, set);
          this.sets.push(set);
          let bonus: Bonus[] = set.bonuses;
          set.bonuses.forEach((bonus) => {
            if (bonus.nombre.includes("2")) {
              this.bonusesMap.set("2 " + set.nombre, bonus);
              return;
            }
            if (bonus.nombre.includes("4")) {
              this.bonusesMap.set("4 " + set.nombre, bonus);
              return;
            }
            if (bonus.nombre.includes("6")) {
              this.bonusesMap.set("6 " + set.nombre, bonus);
              return;
            }
          });
          set.partes.forEach((item) => {
            this.setsByItemMap.set(item.nombre, set);
          });
        });
        return this.setItemsService.getSetItems();
      }),
      concatMap((response) => {
        this.items = response;
        this.rechargeItemsList = false;
        setTimeout(() => {
          this.rechargeItemsList = true;
        }, 0);
        return this.setdataSharedService.getUserSetToModify;
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

  constructor( private setService:SetsService,
              private setItemsService:SetItemsService,
              private router:Router,
              private setdataSharedService:SetSharedDataService,
              private messageService: MessageService){

  }

  filter(elemento:any,elemento2:any){
    if(elemento.target.value){
      elemento2.filter(elemento.target.value,'nombre', 'contains');
    }else{
      elemento2.filter(" ",'nombre', 'contains');
    }
    
  }

  


  addSetItem(item:Parte){
    let type;
    for(let key of Object.values(TypeItemSet)){
      if(item.nombre.includes(key)){
        type = key;
        if(this.typeItemsAdded.includes(key)){
          return;
        }
        this.typeItemsAdded.push(type);
        break;
      }
    }
    if(this.set.partes.length < 6 ){
      let setName = this.setsByItemMap.get(item.nombre)?.nombre;
      if(setName){
        item.setName = setName;
      this.set.partes.push(item);
      this.calculateBonuses(this.set.partes);
      }
      
    }
  }

  

  deleteSetItem(item:Parte){
    const resultado = this.set.partes.filter(setItem => setItem.nombre != item.nombre);
    let itemToDelete = this.set.partes.find(elem => elem.nombre == item.nombre);
    if(itemToDelete){
      for(let key of Object.values(TypeItemSet)){
        if(itemToDelete.nombre.includes(key)){
          this.typeItemsAdded = this.typeItemsAdded.filter(type => type != key);
        }
      }
    }
    
    this.set.partes = resultado;
    this.calculateBonuses(this.set.partes);
  }
  

  calculateBonuses(partes: Parte[]) {

    let mapa: Map<string,number> = new Map<string,number>();
    partes.forEach(item =>{
      let num = mapa.get(item.setName);
      if(num){
        mapa.set(item.setName,(num+1));
      }else{
        mapa.set(item.setName,1);
      }
    });

    this.findBonuses(mapa);
    //this.prueba();
  }

  findBonuses(mapa: Map<string, number>) {
    let listBonusL : ListaBonus [] = [];
    mapa.forEach((key,value)=>{
        let num = Number(key);
        if(num >= 2){
          let bonus = this.bonusesMap.get("2 "+value);
          if(bonus){
            let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.listaBonus));
            listBonusL.push(...listaAux);
          }
        }

        if(num >= 4){
          let bonus = this.bonusesMap.get("4 "+value);
          if(bonus){
            let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.listaBonus));
            listBonusL.push(...listaAux);
          }
        }

        if(num >= 6){
          let bonus = this.bonusesMap.get("6 "+value);
          if(bonus){
            let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.listaBonus));
            listBonusL.push(...listaAux);
          }
        }
    });
    this.listaBonus = ListaBonusUtils.mergeListBonus(listBonusL);

  }

  updateSet(){
    if(this.items.length>0 && this.setName && this.setName.length > 6 ){
      let itemsName:string [] = [];
      this.set.partes.forEach( item => itemsName.push(item.nombre));
      let body : ICreateUserSet = {
        setName:this.setName,
        equipment:itemsName
      }
      this.setService.updateUserSet(body).subscribe(
        /*response => {
          console.log(response.status);
        }*/
        (response: HttpResponse<UserSetDTOResponse>) => {
          const statusCode = response.status; // Código de respuesta
          console.log(statusCode);
          // Resto del manejo de la respuesta
          this.showSuccess("Set "+ this.setName +" updated succesfully");
        },
        (error) =>{
          console.log(error.error);
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
      this.set.partes.forEach( item => itemsName.push(item.nombre));
      let body : ICreateUserSet = {
        setName:this.setName,
        equipment:itemsName
      }
      this.setService.createUserSet(body).subscribe(
        /*response => {
          console.log(response.status);
        }*/
        (response: HttpResponse<UserSetDTOResponse>) => {
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
 

