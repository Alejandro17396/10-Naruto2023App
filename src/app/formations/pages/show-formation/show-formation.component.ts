import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormationElement } from '../../interfaces/formations.interface';
import { Ninja, Skill,Attribute as NinjaAttribute, NinjaFilter } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Filters } from 'src/app/sets/interfaces/set.interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FilterNinjaPanelComponent } from 'src/app/ninjas/pages/filter-ninja-panel-component/filter-ninja-panel-component.component';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { FormationService } from '../../services/formation.service';
import { NinjasService } from '../../../ninjas/services/ninjas-service.service';
import { CompareFormationsListPanelComponent } from '../compare-formations-list-panel/compare-formations-list-panel.component';

@Component({
  selector: 'show-formation',
  templateUrl: './show-formation.component.html',
  styleUrls: ['./show-formation.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class ShowFormationComponent implements OnInit{
  ngOnInit(): void {
    this.skillsShow = this.showFormation.supports[0].skills;
    this.ninjasService.getNinjas().subscribe(
      response =>{
        this.ninjas = response.ninjas;
      }
    );
    this.attributesFilterList.push(
      { attributeName:"attack",
        action:"increase",
        impact:"all allies",
        condition:"ninja is alive",
        value:30 }
    );
  }

  constructor(private formationsService:FormationService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ninjasService:NinjasService,
    private cdr: ChangeDetectorRef){

  }

  @Input() showFormation:FormationElement = FormationElement.createFormation();
  @Input() skillsShow:Skill []=[];
  @Input() formationsToCompare:FormationElement[] = [];
  @Input() ninja:Ninja = Ninja.createNinja();
  @Output() changeFormations: EventEmitter<FormationElement[]>= new EventEmitter<FormationElement[]>();
  @Input() interact!:boolean;
  changeNinjaSkills(ninja:Ninja){
    this.ninja = ninja;
    console.log(this.showFormation)
  }

  viewCompareList(){
    console.log(this.formationsToCompare)
    const data = {
     formations:this.formationsToCompare
    };
    this.ref = this.dialogService.open(CompareFormationsListPanelComponent, {
      header: 'Set filter conditions',
      width: '80%',
      height:'80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });
  }


  filters:Filters = {
    order:false,
    filter:false,
    set:"All sets"
  };
  ref!: DynamicDialogRef;
  attributesFilterList:NinjaAttribute [] = [];
  ninjas:Ninja[]=[];


  showFilterPanel(){
    const data = {
      attributesFilterList: this.attributesFilterList,
      filters: this.filters,
      ninjas:this.ninjas,
      ninja:this.ninjas[0]
    };
    this.ref = this.dialogService.open(FilterNinjaPanelComponent, {
      header: 'Set filter conditions',
      width: '80%',
      height:'80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe(() =>{
      
    });
  }

  generateCombos(){
    let finalFilter : NinjaFilter = new NinjaFilter();
      this.attributesFilterList.forEach(
        response =>{
          finalFilter.filters.push(ListaBonusUtils.AttributeToFilter(response));
        }
      );
      console.log("el filtro es ")
      console.log(finalFilter);
      console.log(this.filters)
      finalFilter.formationNumNinjas = 4;
      this.formationsService.createFormation(finalFilter,this.filters.order,this.filters.filter).subscribe(
        response=>{
          this.showFormation = response.formations[0];
          this.changeFormations.emit(response.formations);
        }
    );  
  }
  
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

}
