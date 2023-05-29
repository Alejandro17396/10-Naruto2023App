import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';
import { NinjasService } from '../../services/ninjas-service.service';
import { Ninja, NinjaUserFormationDTO, Skill } from '../../interfaces/Ninja.interfaces';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { SaveElement } from 'src/app/shared/interfaces/attributes.interface,';

@Component({
  selector: 'app-view-own-ninjas',
  templateUrl: './view-own-ninjas.component.html',
  styleUrls: ['./view-own-ninjas.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ViewOwnNinjasComponent implements OnInit{

  constructor(private ninjasService:NinjasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router,
    private ninjasDataSharedService:NinjasSharedDataService){}

  ngOnInit(): void {
    this.ninjasService.getUserNinjas().subscribe(
      response =>{
        this.ninjas = response;
        if(response.length > 0){
          this.ninjaShow = response[0];
          if(response[0].accesories && response[0].accesories.nombre){
            this.accesorieSetName = response[0].accesories.nombre;
          }
          if(response[0].equipment && response[0].equipment.nombre){
            this.setName =  response[0].equipment.nombre;
          }

        }
      }
    );
  }

  accesorieSetName:string = "";
  setName:string = "";
  ninjas:NinjaUserFormationDTO [] = [];
  ninjas2:Ninja [] = [];
  rechargeNinjasList:boolean = true;
  selectedNinja!:Ninja;
  ninja:Ninja = Ninja.createNinja();
  ninjaShow!:NinjaUserFormationDTO;
  ninjaUser!:NinjaUserFormationDTO;
  listaBonus:ListaBonus[] = [];
  indexSelectedNinja:number = 0;
  skillText:string = "";
  titulo:string = "";
  visible:boolean = false;
  position:string = "left";
  showDialog(skill:Skill){
    this.titulo = skill.nombre+" ("+skill.type+")";
    this.skillText = skill.skillText;
    this.visible = true;
  }

  filter(elemento:any,elemento2:any){
    if(elemento.target.value){
      elemento2.filter(elemento.target.value,'nombre', 'contains');
    }else{
      elemento2.filter(" ",'nombre', 'contains');
    }
  }

  showNinja(ninja:NinjaUserFormationDTO,index:number){
    
    this.indexSelectedNinja = index;
    //this.ninja = ninja.ninja;
    this.ninjaShow = ninja;
    let listaBonusL:ListaBonus [] = [];
    console.log(ninja);
    if(this.ninjaShow.accesories && this.ninjaShow.accesories.nombre){
      this.accesorieSetName = this.ninjaShow.accesories.nombre;
    }
    if(this.ninjaShow.equipment && this.ninjaShow.equipment.nombre){
      this.setName =  this.ninjaShow.equipment.nombre;
    }
    /*set.bonuses.forEach(
      bonus =>{
        let aux: ListaBonus [] = JSON.parse(JSON.stringify(bonus.bonuses));
        listaBonusL.push(...aux);
      }
    )*/
   // this.listaBonus = ListaBonusUtils.mergeListBonus(listaBonusL);
  }

  modifyNinja(cadena:string){
    console.log("tengo que modificar");
    this.modify =true;
  }

  deleteNinja(cadena:string){
    console.log("tengo que eliminar");
  }

  create(cadena:SaveElement){
    console.log("tengo que crear");
  }

  updateNinja(cadena:SaveElement){
    console.log("tengo que update");
    this.modify =false;
  }
  modify:boolean =false;

}
