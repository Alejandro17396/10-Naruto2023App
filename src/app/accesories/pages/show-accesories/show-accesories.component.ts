import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccesorieSet, BonusBonus } from '../../interfaces/accesories.interfaces';
import { Atributo, Filters, ListaBonus, SearchSetsByFilter } from 'src/app/sets/interfaces/set.interfaces';
import { BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SetsService } from 'src/app/sets/services/sets.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FilterSetPanelComponent } from 'src/app/sets/pages/filter-set-panel/filter-set-panel.component';
import { AccesoriesService } from '../../services/accesories.service';
import { ConfirmDialogSetComponent } from 'src/app/sets/pages/confirm-dialog-set/confirm-dialog-set.component';
import { ConfirmDialogAccesorieSetComponent } from '../confirm-dialog-accesorie-set/confirm-dialog-accesorie-set.component';
import { AccesorieSetsFilterPanelComponent } from '../accesorie-sets-filter-panel/accesorie-sets-filter-panel.component';

@Component({
  selector: 'show-accesories',
  templateUrl: './show-accesories.component.html',
  styleUrls: ['./show-accesories.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class ShowAccesoriesComponent implements OnInit{
  ngOnInit(): void {
  }
  constructor(public dialogService: DialogService,
    private accesoriesService:AccesoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService){
}

  @Input() showAccesories!:AccesorieSet;
  @Input() listaBonus!: ListaBonus[];
  @Input() attributesFilterList!:BonusAttribute[];
  @Input() showButtons:boolean = true;
  @Output() setsChanged: EventEmitter<SearchSetsByFilter>= new EventEmitter<SearchSetsByFilter>() ;
  @Output() showCompareView: EventEmitter<string>= new EventEmitter<string>() ;
            accesories:AccesorieSet[]=[];

  filter:Filters = {
    order:false,
    filter:false,
    awakening:false,
    or:false,
    set:"All sets"
  };
  setFilter:AccesorieSet = new AccesorieSet("",[],[]);
  displayConfirmDialog:boolean = false;
    
  ref!: DynamicDialogRef;

 

  showFilterPanel(){
    const data = {
      attributesFilterList: this.attributesFilterList,
      filters: this.filter,
      setFilter :this.setFilter
    };
    this.ref = this.dialogService.open(FilterSetPanelComponent, {
      header: 'Set filter conditions',
      width: '80%',
      height:'80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });
  }

  compareSets(){
    this.showCompareView.emit("CompareSets");

  }

  generateComboSets(){
    const data = {
      attributesFilterList: this.attributesFilterList,
      filters: this.filter,
      setFilter :this.setFilter
    };
    this.ref = this.dialogService.open(AccesorieSetsFilterPanelComponent, {
      header: 'Accesories to use',
      width: '80%',
      height:'90%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe((result) => {
      if(!result){
        this.showError();
        console.log(result)
        return;
      }
      if(this.attributesFilterList.length === 0){
        this.showError();
      }else{
        let attributes : Atributo [] = [];
        let order : Atributo [] = [];
        let attributesFilter : ListaBonus [] = [];
        this.attributesFilterList.forEach(attribute =>{
          attributes.push({nombre:attribute.name});
          order.push({nombre:attribute.name});
          attributesFilter.push({nombreAtributo:attribute.name,valor:attribute.value,action:"",impact:"",condition:"",time:""});
        });
  
        let filtro :SearchSetsByFilter ={
          attributes : attributes,
          order : order,
          attributesFilter : attributesFilter,
          filters:this.filter,
          type:"combo",
          intensity:result?.intensity,
          sets:result?.sets,
          startSet:result?.startSet,
          endSet:result?.endSet

        }
        this.setsChanged.emit(filtro);
        this.showSuccess();
      }
  });

   
  }

  mostrarResultados(){
    const data = {
      showSet:this.showAccesories
    };

    this.ref = this.dialogService.open(ConfirmDialogAccesorieSetComponent, {
      header: 'Set filter conditions',
      width: '20%',
      height:'20%',
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
