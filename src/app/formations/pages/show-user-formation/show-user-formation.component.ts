import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionToDo, DeleteUserFormationDTO, ICreateFormation, UserFormationDTO } from '../../interfaces/formations.interface';
import { Formation, ICreateUserNinja, Ninja, NinjaUserFormationDTO } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { FormationService } from '../../services/formation.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ShowNinjaUserFormationPanelComponent } from '../show-ninja-user-formation-panel/show-ninja-user-formation-panel.component';
import { NinjasService } from 'src/app/ninjas/services/ninjas-service.service';
import { CreateOwnNinjaComponent } from 'src/app/ninjas/pages/create-own-ninja/create-own-ninja.component';
import { NinjasSharedDataService } from '../../../ninjas/services/ninjas-shared-data.service';
import { SaveModifyNinjaUserComponent } from '../save-modify-ninja-user/save-modify-ninja-user.component';
import { NinjaUtils } from 'src/app/ninjas/utils/NinjaUtils';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'show-user-formation',
  templateUrl: './show-user-formation.component.html',
  styleUrls: ['./show-user-formation.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class ShowUserFormationComponent implements OnInit {
 
  ngOnInit(): void {
  }

  constructor(private formationsService:FormationService,
    private ninjasService:NinjasService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef,
    private ninjasSharedDataService:NinjasSharedDataService){}

  @Input() showFormation!:UserFormationDTO;
  @Input() supports:NinjaUserFormationDTO[] = [];
  @Input() assaulters:NinjaUserFormationDTO[] = [];
  @Input() vanguards:NinjaUserFormationDTO[] = [];
  @Input() canModify:boolean=false;
  @Output() formationChanged: EventEmitter<string>= new EventEmitter<string>();
  formationName:string = "";
  ninja:Ninja = Ninja.createNinja();
  ref!: DynamicDialogRef;

  pene(){
    console.log("penme")
  }

  changeNinjaSkills(ninja:NinjaUserFormationDTO){
    this.ninja = ninja.ninja;
    console.log("vamos a mostrar")
    console.log(ninja);
   
    if(this.canModify){
      const data = {
        ninjaShow: ninja,
        canModify:true,
        formationView:true
      };
      this.ninjasSharedDataService.setUserNinjaToModify = ninja;
      //console.log("voy a enviar mod")
     // console.log(data);
      //CreateOwnNinjaComponent
      //SaveModifyNinjaUserComponent
      this.ref = this.dialogService.open(CreateOwnNinjaComponent, {
        header: 'Ninja creation',
        width: '80%',
        height:'90%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: data
      });

      this.ref.onClose.subscribe(() =>{
        console.log(ninja)
      });

    }else{
      const data = {
        ninjaShow: ninja,
        canModify:false,
        formationView:true
      };
      this.ref = this.dialogService.open(ShowNinjaUserFormationPanelComponent, {
        header: 'Set filter conditions',
        width: '80%',
        height:'90%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: data
      });
    }
    
  }

  calculateFormationTalent(){
    if(!this.showFormation){
      console.log("unga unga");
      return;
    }
    const body: Map<string,string> = new Map<string,string>();
    this.showFormation.ninjas.forEach(
      ninja =>{
        body.set(ninja.ninja.name,"SKILL");
      }
    );
    this.formationsService.createFormationByNinjas(body).subscribe(
      response =>{
        this.showFormation.mergedTalentAttributes = response.mergedTalentAttributes;
        this.showFormation.finalSkillsAttributes = response.finalSkillsAttributes;
      }
    );

  }
  showFilterPanel(){
    
  }

  removeAssaulterFromFormation(ninja:NinjaUserFormationDTO){
    if(ninja.ninja.formation == Formation.Assaulter 
      && this.showFormation.assaulters){
        this.showFormation.assaulters = 
        this.showFormation.assaulters.filter(
          ninja2 =>{
            if(ninja2.ninja.name === ninja.ninja.name ){
              return false;
            }
            return true;
          }
        );
        this.showFormation.ninjas =
        this.showFormation.ninjas.filter(
          ninja2 =>{
            if(ninja2.ninja.name === ninja.ninja.name ){
              return false;
            }
            return true;
          }
        );

        this.calculateFormationTalent();
      }
  }

  removeSupportFromFormation(ninja:NinjaUserFormationDTO){
    if(ninja.ninja.formation == Formation.Support 
      && this.showFormation.supports){
        this.showFormation.supports = 
        this.showFormation.supports.filter(
          ninja2 =>{
            if(ninja2.ninja.name === ninja.ninja.name ){
              return false;
            }
            return true;
          }
        );
        this.showFormation.ninjas =
        this.showFormation.ninjas.filter(
          ninja2 =>{
            if(ninja2.ninja.name === ninja.ninja.name ){
              return false;
            }
            return true;
          }
        );

        this.calculateFormationTalent();
      }
  }

  removeVanguardFromFormation(ninja:NinjaUserFormationDTO){
    if(ninja.ninja.formation == Formation.Vanguard 
      && this.showFormation.vanguards){
        this.showFormation.vanguards = 
        this.showFormation.vanguards.filter(
          ninja2 =>{
            if(ninja2.ninja.name === ninja.ninja.name ){
              return false;
            }
            return true;
          }
        );
        this.showFormation.ninjas =
        this.showFormation.ninjas.filter(
          ninja2 =>{
            if(ninja2.ninja.name === ninja.ninja.name ){
              return false;
            }
            return true;
          }
        );

        this.calculateFormationTalent();
      }
  }

  updateFormation(){

    if(this.showFormation.ninjas.length > 1 ){
      this.showError("You must add at least one ninja to the formation.");
      return;
    }
    if(this.formationName.length<5){
      this.showError("Formation name must had at least 5 characters");
      return;
    }
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save formation ' +this.showFormation.name +'?' +'\n'
      +'Ensured to set all data correctly',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showFormation.name = this.formationName;
        let ninjasBody:ICreateUserNinja [] = [];
        this.showFormation.ninjas.forEach(
          ninjaF =>{
            ninjasBody.push(NinjaUtils.NinjaUserDTOToICreateNinjaUser(ninjaF));
          }
        );
        let body:ICreateFormation = {
            name:this.formationName,
            ninjas:ninjasBody
        };
        
        this.formationsService.updateUserFormation(body).subscribe(
          (response:HttpResponse<UserFormationDTO>) =>{
            this.showSuccess("Formation " + body.name + "updated succesfully");
            console.log(response.body);
          },
          (error:DeleteUserFormationDTO) =>{
            this.showError(error.message);
          }
         
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

  saveFormation(){
    if(this.showFormation.ninjas.length > 1 ){
      this.showError("You must add at least one ninja to the formation.");
      return;
    }
    if(this.formationName.length<5){
      this.showError("Formation name must had at least 5 characters");
      return;
    }
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save formation ' +this.showFormation.name +'?' +'\n'
      +'Ensured to set all data correctly',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showFormation.name = this.formationName;
        let ninjasBody:ICreateUserNinja [] = [];
        this.showFormation.ninjas.forEach(
          ninjaF =>{
            ninjasBody.push(NinjaUtils.NinjaUserDTOToICreateNinjaUser(ninjaF));
          }
        );
        let body:ICreateFormation = {
            name:this.formationName,
            ninjas:ninjasBody
        };
        
        this.formationsService.createUserFormation(body).subscribe(
          (response:HttpResponse<UserFormationDTO>) =>{
            this.showSuccess("Formation " + body.name + "saved succesfully");
            console.log(response.body);
          },
          (error:DeleteUserFormationDTO) =>{
            this.showError(error.message);
          }
         
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

  showSuccess(text:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showError(text:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }
 
  modify(){

  }

  delete(){

  }
}
