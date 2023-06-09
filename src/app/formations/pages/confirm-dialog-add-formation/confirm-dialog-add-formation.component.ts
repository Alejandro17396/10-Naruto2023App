import { Component, OnInit } from '@angular/core';
import { FormationElement, ICreateFormation } from '../../interfaces/formations.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormationService } from '../../services/formation.service';
import { ICreateUserNinja } from '../../../ninjas/interfaces/Ninja.interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog-add-formation',
  templateUrl: './confirm-dialog-add-formation.component.html',
  styleUrls: ['./confirm-dialog-add-formation.component.css']
})
export class ConfirmDialogAddFormationComponent implements OnInit{
  
  ngOnInit(): void {
    this.showFormation = this.config.data.formation;
  }

  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private formationsService:FormationService,
    private messageService: MessageService) {}

  showFormation:FormationElement = FormationElement.createFormation();
  formationName:string ="";
  warnMessage:boolean =false;

  reject(){
    this.ref.close();
  }

  accept(){
    if(this.formationName && this.formationName.length >6){
      let ninjas:ICreateUserNinja [] = [];
      let save:boolean = true;
      this.showFormation.assaulters.forEach(
        ninja =>{
          if(!ninja.nameAux || ninja.nameAux.length <5){
            this.showError("Ninja " + ninja.name + " name must had at least 5 characters");
            save = false;
          }else{
            ninjas.push({
              name:ninja.nameAux,
              ninja:ninja.name
            })
          }
          
        }
      );
      this.showFormation.supports.forEach(
        ninja =>{
          if(!ninja.nameAux || ninja.nameAux.length <5){
            this.showError("Ninja " + ninja.name + " name must had at least 5 characters");
            save = false;
          }else{
            ninjas.push({
              name:ninja.nameAux,
              ninja:ninja.name
            })
          }
        }
      );
      this.showFormation.vanguards.forEach(
        ninja =>{
          if(!ninja.nameAux || ninja.nameAux.length <5){
            this.showError("Ninja " + ninja.name + " name must had at least 5 characters");
            save = false;
          }else{
            ninjas.push({
              name:ninja.nameAux,
              ninja:ninja.name
            })
          }
        }
      );
      if(save){
        console.log("Se gaurda");
        let formation:ICreateFormation = {
          name:this.formationName,
          ninjas:ninjas
        }
        console.log(formation);
        this.formationsService.createUserFormation(formation).subscribe(
          response =>{
            this.showSuccess("Formation " + this.formationName + " saved succesfully");
          }
        )
      }
 
    }else{
      this.showError("Formation name must have 5 characters at least");
    }
  }

  showSuccess(text:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showError(text:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }

}
