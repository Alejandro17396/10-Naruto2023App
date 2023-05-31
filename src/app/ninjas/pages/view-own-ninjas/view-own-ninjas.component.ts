import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';
import { NinjasService } from '../../services/ninjas-service.service';
import { DeleteNinjaUserDTO, Ninja, NinjaUserFormationDTO, Skill } from '../../interfaces/Ninja.interfaces';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { SaveElement } from 'src/app/shared/interfaces/attributes.interface,';
import { ShowNinjaUserComponent } from '../show-ninja-user/show-ninja-user.component';

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
  ninjaShow:NinjaUserFormationDTO = new NinjaUserFormationDTO();
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
    this.ninjasDataSharedService.setUserNinjaToModify = this.ninjas[this.indexSelectedNinja];
    this.route.navigate(['/ninjas/createOwnNinjas']);
    this.modify =true;
  }

  deleteNinja(cadena:string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete ninja ' +this.ninjaShow.nombre +'?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ninjasService.deleteNinjaUser(this.ninjaShow.nombre).subscribe(
          (response:DeleteNinjaUserDTO) =>{
            this.ninjas.splice(this.indexSelectedNinja,1);
            this.showNinja(this.ninjas[0],0);
            this.showSuccess(response.message);
            this.rechargeNinjasList = false;
            setTimeout(() => {
              this.rechargeNinjasList = true;
            }, 0);
          },
          (error:DeleteNinjaUserDTO) =>{
            this.showError(error.message);
          }
          /*(error:ErrorResponse) =>{
            this.showError(error.message);
          }*/
      );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              break;
          case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
      }
      }
  });
  }

  create(cadena:SaveElement){
    console.log("tengo que crear");
  }

  updateNinja(cadena:SaveElement){
    console.log("tengo que update");
    this.modify =false;
  }
  modify:boolean =false;

  showSuccess(text:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showError(text:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }

}
