import { Component, Optional, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Attribute, Attribute2, ICreateUserNinja, Ninja, NinjaUserFormationDTO, Skill, SkillType } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { Bonus, ICreateUserSet, ListaBonus, Set, TypeItemSet } from 'src/app/sets/interfaces/set.interfaces';
import { Router } from '@angular/router';
import { AccesoriesService } from '../../../accesories/services/accesories.service';
import { SetsService } from '../../../sets/services/sets.service';
import { UserSetDTOResponse } from '../../../sets/interfaces/set.interfaces';
import { Parte as ParteSet } from 'src/app/sets/interfaces/set.interfaces';
import {ICreateUserAccesorieSet, Parte as ParteAccesorio, TypeAccesorieItemSet} from 'src/app/accesories/interfaces/accesories.interfaces';

import { AccesorieSet, ContentBonus, Tipo} from 'src/app/accesories/interfaces/accesories.interfaces';
import { UserAccesorieSetDTO } from '../../../accesories/interfaces/accesories.interfaces';
import { SetItemsService } from 'src/app/sets/services/set-items-service.service';
import { concatMap, partition } from 'rxjs';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { AccesorieSetItemsService } from 'src/app/accesories/services/accesorie-set-items.service';

import { HttpResponse } from '@angular/common/http';
import { SaveElement } from 'src/app/shared/interfaces/attributes.interface,';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ActionToDo } from 'src/app/formations/interfaces/formations.interface';
import { NinjasService } from 'src/app/ninjas/services/ninjas-service.service';
import { NinjasSharedDataService } from 'src/app/ninjas/services/ninjas-shared-data.service';
import { ShowNinjaUserComponent } from 'src/app/ninjas/pages/show-ninja-user/show-ninja-user.component';
import { NinjaUtils } from 'src/app/ninjas/utils/NinjaUtils';
import { SaveModifyNinjaUserShowComponent } from '../save-modify-ninja-user-show/save-modify-ninja-user-show.component';

@Component({
  selector: 'app-save-modify-ninja-user',
  templateUrl: './save-modify-ninja-user.component.html',
  styleUrls: ['./save-modify-ninja-user.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class SaveModifyNinjaUserComponent {

  constructor(private ninjasService:NinjasService,
    private accesoriesService:AccesoriesService,
    private setsService:SetsService,
    private setItemsService:SetItemsService,
    private accesorieSetItemsService:AccesorieSetItemsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router,
    private ninjasDataSharedService:NinjasSharedDataService,
    @Optional() public config: DynamicDialogConfig){
    }

  ngOnInit(): void {

    if(this.config && this.config.data && this.config.data.formationView){
      this.formationView = this.config.data.formationView;
      console.log("lo pones a " +this.config.data.formationView)
      let response = this.config.data.ninjaShow;
      if(response){
        this.ninjaShow = response;
        if(response.accesories && response.accesories.nombre){
          this.accesorieSetName = response.accesories.nombre;
        }
        if(response.equipment && response.equipment.nombre){
          this.setName =  response.equipment.nombre;
        }
        if(response.nombre){
          this.ninjaName =  response.nombre;
        }
        if(this.ninjaShow.equipment && this.ninjaShow.equipment.partes.length> 0){
          this.setItemUsed(this.ninjaShow.equipment.partes);
        }
        if(this.ninjaShow.accesories && this.ninjaShow.accesories.partes.length> 0){
          this.setAccesoriesItemUsed(this.ninjaShow.accesories.partes);
        }
        if(this.ninjaShow.ninja){
          this.addNinja(this.ninjaShow.ninja);
        }
      }
      console.log("voy a crear ninjas de formaciones");
    }

    this.ninjasService.getNinjas().subscribe(
      response =>{
        this.ninjas = response.ninjas.filter(ninja => ninja.formation === this.config.data.formationPosition);
      }
    );
    this.setsService.getSets().pipe(
      concatMap((response) => {
        response.content.forEach((set) => {
          /*let bonus: Bonus[] = set.bonuses;
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
          });*/
          set.partes.forEach((item) => {
            this.setsByItemMap.set(item.nombre, set);
          });
        });
        return this.setItemsService.getSetItems();
      }),
      concatMap((response)=>{
        this.setsItems = response;
        return this.accesoriesService.getAccesories();
      }),
      concatMap((response)=>{
        response.content.forEach((set) => {
          //let bonus: ContentBonus[] = set.bonuses;
        /*  set.bonuses.forEach((bonus) => {
            if (bonus.tipo === Tipo.Agility) {
              this.bonusesAccesorieMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.Power) {
              this.bonusesAccesorieMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.Chakra) {
              this.bonusesAccesorieMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.Force) {
              this.bonusesAccesorieMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.FullSetBonus) {
              this.bonusesAccesorieMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
          });*/
          set.partes.forEach((item) => {
            this.accesoriesByItemMap.set(item.nombre, set);
          });
        });
        return this.accesorieSetItemsService.getSetItems();
      })/*,
      concatMap((response) =>{
        this.accesoriesItems = response;
        //return this.ninjasService.getUserNinjas();
        return this.ninjasDataSharedService.getUserNinjaToModify;
      })*/
    ).subscribe((response) =>{
      this.accesoriesItems = response;
      //return this.ninjasService.getUserNinjas();
      return this.ninjasDataSharedService.getUserNinjaToModify;
    })
   /* subscribe((response) =>{
      if(response){
        this.ninjaShow = response;
        if(response.accesories && response.accesories.nombre){
          this.accesorieSetName = response.accesories.nombre;
        }
        if(response.equipment && response.equipment.nombre){
          this.setName =  response.equipment.nombre;
        }
        if(response.nombre){
          this.ninjaName =  response.nombre;
        }
        if(this.ninjaShow.equipment && this.ninjaShow.equipment.partes.length> 0){
          this.setItemUsed(this.ninjaShow.equipment.partes);
        }
        if(this.ninjaShow.accesories && this.ninjaShow.accesories.partes.length> 0){
          this.setAccesoriesItemUsed(this.ninjaShow.accesories.partes);
        }
        if(this.ninjaShow.ninja){
          this.addNinja(this.ninjaShow.ninja);
        }

        /*this.setAccesoriesItemUsed(this.ninjaShow.accesories.partes);
        this.addNinja(this.ninjaShow.ninja);
      }else{
        this.ninjaShow = new NinjaUserFormationDTO();
      }
       
    });*/

    this.setsService.getUserSets().subscribe(
      response =>{
        this.userSets = response;
      }
    );

    this.accesoriesService.getUserSets().subscribe(
      response =>{
        this.userAccesoriesSet = response;
      }
    );
    

  }

  formationView:boolean = false;
  accesorieSetName:string = "";
  setName:string = "";
  ninjaName:string = "";
  
  rechargeNinjasList:boolean = true;
  selectedNinja!:Ninja;
  
  ninja:Ninja = Ninja.createNinja();
  ninjaShow:NinjaUserFormationDTO = new NinjaUserFormationDTO();
  bonusesMap: Map<string, Bonus> =new Map<string, Bonus>();
  setsByItemMap: Map<string, Set> =new Map<string, Set>(); 
  listaBonus: ListaBonus[] = [];
  typeItemsAdded:string [] = [];

  bonusesAccesorieMap: Map<string, ContentBonus> =new Map<string, ContentBonus>();
  typeAccesorieItemsAdded:string [] = [];
  accesoriesByItemMap: Map<string, AccesorieSet> =new Map<string, AccesorieSet>(); 
  //dialogInfo
  skillText:string = "";
  titulo:string = "";
  visible:boolean = false;
  position:string = "left";
  actionToDo:ActionToDo= {
    save:false,
    update:false,
    exit:false
  };

  //listas de elementos de las tablas
  ninjasUser:NinjaUserFormationDTO [] = [];
  ninjas:Ninja [] = [];
  userSets:UserSetDTOResponse [] = []; 
  setsItems:ParteSet[]=[];
  userAccesoriesSet:UserAccesorieSetDTO[] = [];
  accesoriesItems:ParteAccesorio[]= [];


  modify:boolean =false;
  @ViewChild('childComponent') hijoComponent!: SaveModifyNinjaUserShowComponent;

  equipmentUserBonusList:ListaBonus [] = [];
  accesoriesUserBonusList:ListaBonus [] = [];
  ninjaUserBonusList:Attribute[] = [];
  finalNinjaUserBonusList:Attribute2[] = [];

  addUserSet(set:UserSetDTOResponse){
    this.typeItemsAdded = [];
    this.ninjaShow.equipment = JSON.parse(JSON.stringify(set));
    this.setItemUsed(set.partes);
    this.calculateFinalBonus();
    this.setName = set.nombre;
    this.hijoComponent.setTabTo(1);
  }


  addUserAccesorieSet(accesorieSet:UserAccesorieSetDTO){
    this.typeAccesorieItemsAdded = [];
    this.ninjaShow.accesories = JSON.parse(JSON.stringify(accesorieSet));
    this.setAccesoriesItemUsed(accesorieSet.partes);
    this.calculateFinalBonus();
    this.accesorieSetName = accesorieSet.nombre;
    this.hijoComponent.setTabTo(2);
  }

  setItemUsed(parts:ParteSet[]){

    parts.forEach(
      part =>{
        let type;
        for(let key of Object.values(TypeItemSet)){
          if(part.nombre.includes(key)){
            type = key;
            if(this.typeItemsAdded.includes(key)){
              break;
            }
            this.typeItemsAdded.push(type);
            break;
          }
        }
        let setName = this.setsByItemMap.get(part.nombre)?.nombre;
        if(setName){
          part.setName = setName;
        }
     }
    )
  }

  setAccesoriesItemUsed(parts:ParteAccesorio[]){

    parts.forEach(
      part =>{
        let type;
        for(let key of Object.values(TypeAccesorieItemSet)){
          if(part.nombre.includes(key)){
            type = key;
            if(this.typeAccesorieItemsAdded.includes(key)){
              return;
            }
            this.typeAccesorieItemsAdded.push(type);
            break;
          }
        }
        let setName = this.accesoriesByItemMap.get(part.nombre)?.nombre;
        if(setName){
          part.setName = setName;
        }
      }
    );
  }

  showDialog(skill:Skill){
    this.titulo = skill.nombre+" ("+skill.type+")";
    this.skillText = skill.skillText;
    this.visible = true;
  }

  filter(elemento:any,elemento2:any,field:string){
    if(elemento.target.value){
      elemento2.filter(elemento.target.value,field, 'contains');
    }else{

      elemento2.filter(" ",field, 'contains');
    }
  }

  showNinja(ninja:NinjaUserFormationDTO,index:number){
    if(ninja?.ninja){
      this.ninja = ninja.ninja;
    }else{
      this.ninja = Ninja.createNinja();
    }
   
    this.ninjaShow = ninja;
    let listaBonusL:ListaBonus [] = [];
    console.log(ninja);
    if(this.ninjaShow.accesories && this.ninjaShow.accesories.nombre){
      this.accesorieSetName = this.ninjaShow.accesories.nombre;
    }
    if(this.ninjaShow.equipment && this.ninjaShow.equipment.nombre){
      this.setName =  this.ninjaShow.equipment.nombre;
    }
    if(this.ninjaShow.nombre){
      this.ninjaName =  this.ninjaShow.nombre;
    }
  }


  addSetItem(item:ParteSet){
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

    if(this.ninjaShow.equipment && this.ninjaShow.equipment.partes.length < 6 ){
      this.ninjaShow.equipment.partes.push(item);
      this.calculateFinalBonus();
    }
    this.hijoComponent.setTabTo(1);
  }
 
  

  deleteSetItem(item:ParteSet){
    if(this.ninjaShow.equipment){
      const resultado = this.ninjaShow.equipment.partes.filter(setItem => setItem.nombre != item.nombre);
      let itemToDelete = this.ninjaShow.equipment.partes.find(elem => elem.nombre == item.nombre);
      if(itemToDelete){
        for(let key of Object.values(TypeItemSet)){
          if(itemToDelete.nombre.includes(key)){
            this.typeItemsAdded = this.typeItemsAdded.filter(type => type != key);
          }
        }
      } 
      
      this.ninjaShow.equipment.partes = resultado;
      this.calculateFinalBonus();
      this.hijoComponent.setTabTo(1);
    }
  }

 
  //Parte Accesorios

  addAccesoriesSetItem(item:ParteAccesorio){
    let type;
    for(let key of Object.values(TypeAccesorieItemSet)){
      if(item.nombre.includes(key)){
        type = key;
        if(this.typeAccesorieItemsAdded.includes(key)){
          return;
        }
        this.typeAccesorieItemsAdded.push(type);
        break;
      }
    }
    if(this.ninjaShow.accesories && this.ninjaShow.accesories.partes.length < 8 ){
      this.ninjaShow.accesories.partes.push(item);
      this.calculateFinalBonus();
    }
    this.hijoComponent.setTabTo(2);
  }

  deleteAccesoriesSetItem(item:ParteAccesorio){
    if(this.ninjaShow.accesories){
      const resultado = this.ninjaShow.accesories.partes.filter(setItem => setItem.nombre != item.nombre);
      let itemToDelete = this.ninjaShow.accesories.partes.find(elem => elem.nombre == item.nombre);
      if(itemToDelete){
        for(let key of Object.values(TypeAccesorieItemSet)){
          if(itemToDelete.nombre.includes(key)){
            this.typeAccesorieItemsAdded = this.typeAccesorieItemsAdded.filter(type => type != key);
          }
        }
      }
      
      this.ninjaShow.accesories.partes = resultado;
      this.calculateFinalBonus();
      this.hijoComponent.setTabTo(2);
    }
  }

 
  //Parte del Ninja

  addNinja(ninja:Ninja){
    
      this.ninjaShow.ninja = ninja;
      this.calculateFinalBonus();
     // this.hijoComponent.setTabTo(0);
  }

  calculateFinalBonus(){
    let body : ICreateUserNinja = NinjaUtils.NinjaUserDTOToICreateNinjaUser(this.ninjaShow);
      this.ninjasService.calculateNinjaUserFinalBonuses(body).subscribe(
        response =>{
          this.ninjaShow.selfBonusWithItems = response.selfBonusWithItems;
          /*this.finalNinjaUserBonusList = response.selfBonusWithItems[0].listaBonus;
          console.log(this.finalNinjaUserBonusList);*/
        }
    );
   // console.log("aaauuuu");
  }

  deleteNinjaFromUser(ninja:Ninja){
    console.log(ninja);
   // this.ninjaShow.ninja = undefined;

  }

  modifyNinja(cadena:string){
    console.log("tengo que modificar");
    this.modify =true;
  }

  deleteNinja(cadena:string){
    console.log("tengo que eliminar");
  }

  create(element:SaveElement){
    console.log(element)
    if(element.type === 'ninja'){
      this.ninjaName = element.name;
      this.saveNinja();
    }

    if(element.type === 'set'){
      this.setName = element.name;
      this.saveSet();
    }

    if(element.type === 'accesories'){
      this.accesorieSetName = element.name;
      this.saveAccesorieSet();
    }
  }

  update(element:SaveElement){
    
    if(element.type === 'ninja'){
      this.ninjaName = element.name;
      this.updateNinja();
    }

    if(element.type === 'set'){
      this.setName = element.name;
      this.updateSet();
    }

    if(element.type === 'accesories'){
      this.accesorieSetName = element.name;
      this.updateAccesorieSet();
    }

  }

  updateNinja(){
    if(this.config){
      this.actionToDo.update = true;
    }
    if(this.ninjaShow.ninja && this.ninjaName && this.ninjaName.length > 4 ){
      this.ninjaShow.nombre = this.ninjaName;
      let body : ICreateUserNinja = NinjaUtils.NinjaUserDTOToICreateNinjaUser(this.ninjaShow);
      
      this.ninjasService.updateNinjaUser(body).subscribe(
        (response: HttpResponse<NinjaUserFormationDTO>) => {
          const statusCode = response.status; // Código de respuesta
          console.log(statusCode);
          // Resto del manejo de la respuesta
          this.showSuccess("Ninja "+ this.ninjaName +" updated succesfully");
        },
        (error) =>{
          console.log(error.error);
          this.showError(error.error.message);
        }
      );
     }else{
      this.showError("Cant update the ninja name must have 4 characters");
     }
  }

  saveNinja(){
    if(this.ninjaShow.ninja && this.ninjaName && this.ninjaName.length > 4 ){
      this.ninjaShow.nombre = this.ninjaName;
      let body : ICreateUserNinja = NinjaUtils.NinjaUserDTOToICreateNinjaUser(this.ninjaShow);
      console.log("qqq"+this.ninjaShow.nombre);
      this.ninjasService.createNinjaUser(body).subscribe(
        /*response => {
          console.log(response.status);
        }*/
        (response: HttpResponse<NinjaUserFormationDTO>) => {
          const statusCode = response.status; // Código de respuesta
          console.log(statusCode);
          this.showSuccess("Ninja " + this.ninjaName + " saved succesfully");
        },
        (error) =>{
          console.log(error.error);
          this.showError(error.error.message);
        }
      );
     }else{
      this.showError("Cant save the ninja name must have 4 characters");
     }
  }

  updateSet(){
    if(this.ninjaShow.equipment && this.ninjaShow.equipment.partes.length>0 && this.setName && this.setName.length > 6 ){
      let itemsName:string [] = [];
      this.ninjaShow.equipment.partes.forEach( item => itemsName.push(item.nombre));
      let body : ICreateUserSet = {
        setName:this.setName,
        equipment:itemsName
      }
      this.setsService.updateUserSet(body).subscribe(
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
    if(this.ninjaShow.equipment && this.ninjaShow.equipment.partes.length>0 && this.setName && this.setName.length > 6 ){
      let itemsName:string [] = [];
      this.ninjaShow.equipment.partes.forEach( item => itemsName.push(item.nombre));
      let body : ICreateUserSet = {
        setName:this.setName,
        equipment:itemsName
      }
      this.setsService.createUserSet(body).subscribe(
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

  updateAccesorieSet(){
    if(this.ninjaShow.accesories && this.ninjaShow.accesories.partes.length>0 && this.accesorieSetName && this.accesorieSetName.length > 6 ){
      let itemsName:string [] = [];
      this.ninjaShow.accesories.partes.forEach( item => itemsName.push(item.nombre));
      let body : ICreateUserAccesorieSet = {
        accesorieSetName:this.accesorieSetName,
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
          this.showSuccess("Set "+ this.accesorieSetName +" updated succesfully");
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

  saveAccesorieSet(){
    if(this.ninjaShow.accesories && this.ninjaShow.accesories.partes.length>0 && this.accesorieSetName && this.accesorieSetName.length > 6 ){
      let itemsName:string [] = [];
      this.ninjaShow.accesories.partes.forEach( item => itemsName.push(item.nombre));
      let body : ICreateUserAccesorieSet = {
        accesorieSetName:this.accesorieSetName,
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
          this.showSuccess("Set " + this.accesorieSetName + " saved succesfully");
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
