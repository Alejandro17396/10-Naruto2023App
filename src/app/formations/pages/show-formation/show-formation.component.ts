import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormationElement, SearchFormationFilter } from '../../interfaces/formations.interface';
import { Ninja, Skill,Attribute as NinjaAttribute, NinjaFilter } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Filters, Pageable_ } from 'src/app/sets/interfaces/set.interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FilterNinjaPanelComponent } from 'src/app/ninjas/pages/filter-ninja-panel-component/filter-ninja-panel-component.component';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { FormationService } from '../../services/formation.service';
import { NinjasService } from '../../../ninjas/services/ninjas-service.service';
import { CompareFormationsListPanelComponent } from '../compare-formations-list-panel/compare-formations-list-panel.component';
import { ConfirmDialogAddFormationComponent } from '../confirm-dialog-add-formation/confirm-dialog-add-formation.component';

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
  @Output() changeFormations: EventEmitter<SearchFormationFilter>= new EventEmitter<SearchFormationFilter>();
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
    awakening:false,
    or:true,
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
      
      finalFilter.formationNumNinjas = 4;
      let page:Pageable_ = {page:0,size:8};
      let filter:SearchFormationFilter = {
        filter:finalFilter,
        sorted:this.filters.order,
        filtred:this.filters.filter,
        awakening:this.filters.awakening,
        or:this.filters.or
    }

    this.changeFormations.emit(filter);
      /*this.formationsService.createFormation(finalFilter,this.filters.order,this.filters.filter,page,true,false).subscribe(
        response=>{
          this.showFormation = response.formations[0];
          this.changeFormations.emit(response.formations);
        }
    );  */
  }

  saveFormation(){
    const data = {
      formation:this.showFormation
    };

    this.ref = this.dialogService.open(ConfirmDialogAddFormationComponent, {
      header: 'Set filter conditions',
      width: '70%',
      height:'70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });
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
