import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserFormationDTO } from '../../interfaces/formations.interface';
import { Ninja, NinjaUserFormationDTO } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { FormationService } from '../../services/formation.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShowNinjaUserFormationPanelComponent } from '../show-ninja-user-formation-panel/show-ninja-user-formation-panel.component';

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
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef){}

  @Input() showFormation!:UserFormationDTO;
  @Input() supports:NinjaUserFormationDTO[] = [];
  @Input() assaulters:NinjaUserFormationDTO[] = [];
  @Input() vanguards:NinjaUserFormationDTO[] = [];
  ninja:Ninja = Ninja.createNinja();
  ref!: DynamicDialogRef;

  changeNinjaSkills(ninja:NinjaUserFormationDTO){
    this.ninja = ninja.ninja;
    const data = {
      ninjaShow: ninja,
      canModify:false
    };
    this.ref = this.dialogService.open(ShowNinjaUserFormationPanelComponent, {
      header: 'Set filter conditions',
      width: '80%',
      height:'80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });
    
  }

  /*<show-ninja-user 
  [ninjaShow]="ninjaShow"
  [canModify]="modify"
  [accesorieSetName]="accesorieSetName"
  [setName]="setName"
  (modifyNinja)="modifyNinja($event)"
  (deleteNinja)="deleteNinja($event)"
  (createNinja)="create($event)"
  (updateNinja)="updateNinja($event)">
  </show-ninja-user>*/
  showFilterPanel(){
    
    

    this.ref.onClose.subscribe(() =>{
      
    });
  }

  modify(){

  }

  delete(){

  }
}
