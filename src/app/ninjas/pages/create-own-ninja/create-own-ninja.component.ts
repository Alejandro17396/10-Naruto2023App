import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Ninja, NinjaUserFormationDTO, Skill } from '../../interfaces/Ninja.interfaces';
import { Bonus, ListaBonus, Set, TypeItemSet } from 'src/app/sets/interfaces/set.interfaces';
import { NinjasService } from '../../services/ninjas-service.service';
import { Router } from '@angular/router';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';
import { AccesoriesService } from '../../../accesories/services/accesories.service';
import { SetsService } from '../../../sets/services/sets.service';
import { UserSetDTOResponse } from '../../../sets/interfaces/set.interfaces';
import { Parte as ParteSet } from 'src/app/sets/interfaces/set.interfaces';
import {Parte as ParteAccesorio, TypeAccesorieItemSet} from 'src/app/accesories/interfaces/accesories.interfaces';

import { AccesorieSet, ContentBonus, Tipo} from 'src/app/accesories/interfaces/accesories.interfaces';
import { UserAccesorieSetDTO } from '../../../accesories/interfaces/accesories.interfaces';
import { SetItemsService } from 'src/app/sets/services/set-items-service.service';
import { concatMap, partition } from 'rxjs';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { AccesorieSetItemsService } from 'src/app/accesories/services/accesorie-set-items.service';



@Component({
  selector: 'app-create-own-ninja',
  templateUrl: './create-own-ninja.component.html',
  styleUrls: ['./create-own-ninja.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class CreateOwnNinjaComponent {

  constructor(private ninjasService:NinjasService,
    private accesoriesService:AccesoriesService,
    private setsService:SetsService,
    private setItemsService:SetItemsService,
    private accesorieSetItemsService:AccesorieSetItemsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router,
    private ninjasDataSharedService:NinjasSharedDataService){}

  ngOnInit(): void {
    this.ninjasService.getUserNinjas().subscribe(
      response =>{
        this.ninjasUser = response;
        if(response.length > 0){
          this.ninjaShow = response[0];
          if(response[0].accesories && response[0].accesories.nombre){
            this.accesorieSetName = response[0].accesories.nombre;
          }
          if(response[0].equipment && response[0].equipment.nombre){
            this.setName =  response[0].equipment.nombre;
          }
          if(response[0].nombre){
            this.ninjaName =  response[0].nombre;
          }
        }
        this.setItemUsed(this.ninjaShow.equipment.partes);
        this.setAccesoriesItemUsed(this.ninjaShow.accesories.partes);
      }
    );
    this.ninjasService.getNinjas().subscribe(
      response =>{
        this.ninjas = response.ninjas;
      }
    );
    this.setsService.getSets().pipe(
      concatMap((response) => {
        response.content.forEach((set) => {
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
      })
    ).
    subscribe((response) => {
      this.setsItems = response;
    });

    this.accesoriesService.getAccesories().pipe(
      concatMap((response) => {
        response.content.forEach((set) => {
          //let bonus: ContentBonus[] = set.bonuses;
          set.bonuses.forEach((bonus) => {
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
          });
          set.partes.forEach((item) => {
            this.accesoriesByItemMap.set(item.nombre, set);
          });
        });
        return this.accesorieSetItemsService.getSetItems();
      })
    ).subscribe((response) => {
        this.accesoriesItems = response;
    });

    /*this.accesoriesService.getAccesories().subscribe(
      response =>{
        response.content.forEach(set =>{
          this.accesoriesItems.push(...set.partes);
        })
      }
    );*/

    this.setsService.getUserSets().subscribe(
      response =>{
        this.userSets = response;
      }
    );

    this.accesoriesService.getUserSets().subscribe(
      response =>{
        this.userAccesoriesSet = response;
      }
    )

  }

  accesorieSetName:string = "";
  setName:string = "";
  ninjaName:string = "";
  
  rechargeNinjasList:boolean = true;
  selectedNinja!:Ninja;
  
  ninja:Ninja = Ninja.createNinja();
  ninjaShow!:NinjaUserFormationDTO;
  //ninjaUser!:NinjaUserFormationDTO;
  //listaBonus:ListaBonus[] = [];
  //indexSelectedNinja:number = 0;
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


  //listas de elementos de las tablas
  ninjasUser:NinjaUserFormationDTO [] = [];
  ninjas:Ninja [] = [];
  userSets:UserSetDTOResponse [] = []; 
  setsItems:ParteSet[]=[];
  userAccesoriesSet:UserAccesorieSetDTO[] = [];
  accesoriesItems:ParteAccesorio[]= [];


  modify:boolean =false;

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
            if(this.typeItemsAdded.includes(key)){
              return;
            }
            this.typeItemsAdded.push(type);
            break;
          }
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
    
   // this.indexSelectedNinja = index;
    this.ninja = ninja.ninja;
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

    if(this.ninjaShow.equipment.partes.length < 6 ){
      console.log("siii")
      let setName = this.setsByItemMap.get(item.nombre)?.nombre;
      if(setName){
        item.setName = setName;
      this.ninjaShow.equipment.partes.push(item);
      this.calculateBonuses(this.ninjaShow.equipment.partes);
      }
      
    }else{
      console.log("nooo")
    }
  }

  

  deleteSetItem(item:ParteSet){
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
    this.calculateBonuses(this.ninjaShow.equipment.partes);
    console.log("toca elimianr un item del set")
  }

  calculateBonuses(partes: ParteSet[]) {

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
    console.log(this.listaBonus);
  }

  //Parte Accesorios

  addAccesoriesSetItem(item:ParteAccesorio){
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
    if(this.ninjaShow.accesories.partes.length < 8 ){
      let setName = this.accesoriesByItemMap.get(item.nombre)?.nombre;
      if(setName){
      item.setName =setName;
      this.ninjaShow.accesories.partes.push(item);
      this.calculateAccesoriesSetBonuses(this.ninjaShow.accesories.partes);
      }
    }
  }

  deleteAccesoriesSetItem(item:ParteAccesorio){
    const resultado = this.ninjaShow.accesories.partes.filter(setItem => setItem.nombre != item.nombre);
    let itemToDelete = this.ninjaShow.accesories.partes.find(elem => elem.nombre == item.nombre);
    if(itemToDelete){
      for(let key of Object.values(TypeAccesorieItemSet)){
        if(itemToDelete.nombre.includes(key)){
          this.typeItemsAdded = this.typeItemsAdded.filter(type => type != key);
        }
      }
    }
    
    this.ninjaShow.accesories.partes = resultado;
    this.calculateAccesoriesSetBonuses(this.ninjaShow.accesories.partes);
  }
  

  calculateAccesoriesSetBonuses(partes: ParteAccesorio[]) {

    let mapa: Map<string,number> = new Map<string,number>();
    partes.forEach(item =>{
      let num = mapa.get(item.tipo + " " + item.setName);
      if(num){
        mapa.set(item.tipo + " " + item.setName,(num+1));
      }else{
        mapa.set(item.tipo + " " + item.setName,1);
      }
    });

    this.findAccesoriesSetBonuses(mapa,this.isFullSet(partes));

  }

  isFullSet(partes:ParteAccesorio[]){
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

  findAccesoriesSetBonuses(mapa: Map<string, number>,isFull:string|undefined) {
    let listBonusL : ListaBonus [] = [];
    mapa.forEach((key,value)=>{
        let num = Number(key);
        if(num == 2){
          let bonus = this.bonusesAccesorieMap.get(value);
          if(bonus){
            let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.bonuses));
            listBonusL.push(...listaAux);
          }
        }

        if(num >= 4){
          let bonus = this.bonusesAccesorieMap.get("4 "+value);
          if(bonus){
            let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.bonuses));
            listBonusL.push(...listaAux);
          }
        }

        if(num >= 6){
          let bonus = this.bonusesAccesorieMap.get("6 "+value);
          if(bonus){
            let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.bonuses));
            listBonusL.push(...listaAux);
          }
        }
    });

    if(isFull){
      let bonus = this.bonusesAccesorieMap.get(isFull);
          if(bonus){
            let listaAux :ListaBonus[] = JSON.parse(JSON.stringify(bonus.bonuses));
            listBonusL.push(...listaAux);
          }
    }
    this.listaBonus = ListaBonusUtils.mergeListBonus(listBonusL);
    console.log(this.listaBonus);
  }

  //Parte del Ninja

  deleteNinjaFromUser(ninja:Ninja){
    console.log(ninja);

  }

  modifyNinja(cadena:string){
    console.log("tengo que modificar");
    this.modify =true;
  }

  deleteNinja(cadena:string){
    console.log("tengo que eliminar");
  }

  createNinja(cadena:string){
    console.log("tengo que crear");
  }

  updateNinja(cadena:string){
    console.log("tengo que update");
    this.modify =false;
  }
 
}
