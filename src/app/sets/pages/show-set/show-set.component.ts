import { Component,EventEmitter,Input, Output } from '@angular/core';
import { SetsResponsePaginated, Set, ListaBonus, Filters, Atributo, SearchSetsByFilter } from '../../interfaces/set.interfaces';
import { FilterSetPanelComponent } from '../filter-set-panel/filter-set-panel.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { SetsService } from '../../services/sets.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogSetComponent } from '../confirm-dialog-set/confirm-dialog-set.component';


@Component({
  selector: 'app-show-set',
  templateUrl: './show-set.component.html',
  styleUrls: ['./show-set.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class ShowSetComponent {

  @Input() showSet!:Set;
  @Input() listaBonus!: ListaBonus[];
  @Input() attributesFilterList!:BonusAttribute[];
  @Input() showButtons:boolean = true;
  //@Output() setsChanged: EventEmitter<Set[]>= new EventEmitter<Set[]>() ;SearchSetsByFilter
  @Output() setsChanged: EventEmitter<SearchSetsByFilter>= new EventEmitter<SearchSetsByFilter>() ;
  @Output() showCompareView: EventEmitter<string>= new EventEmitter<string>() ;
            sets:Set[]=[];
  

  filter:Filters = {
          order:false,
          filter:false,
          awakening:false,
          or:true,
          set:"All sets"
  };
  setFilter:Set = new Set();
  displayConfirmDialog:boolean = false;

  ref!: DynamicDialogRef;

  constructor(public dialogService: DialogService,
              private setService:SetsService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService){
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

  generateComboSets2(){

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete set ' +"this.set.nombre" +'?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("dssf");
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              break;
          case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You 223have cancelled' });
              break;
      }
      }
  });
  }

  generateComboSets(){

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

      /*this.setService.getComboSets(
        attributes,order,attributesFilter,
        this.filter
      ).subscribe( response =>{
        console.log(response.sets);
        this.sets = response.sets;
        this.setsChanged.emit(this.sets);
      } );*/
      let filtro :SearchSetsByFilter ={
        attributes : attributes,
        order : order,
        attributesFilter : attributesFilter,
        filters:this.filter,
        type:"combo"
      }
      this.setsChanged.emit(filtro);
      this.showSuccess();
    }
  }


  mostrarResultados(){
    console.log(this.setFilter);
    console.log(this.attributesFilterList);
    console.log(this.filter);
    const data = {
      showSet:this.showSet
    };

    this.ref = this.dialogService.open(ConfirmDialogSetComponent, {
      header: 'You are gona save ' + this.showSet.nombre,
      width: '30%',
      height:'30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });
  }
  

  reject(){
    console.log("Has rechazado");
    this.displayConfirmDialog =false;
  }

  accept(){
    console.log("Has aceptado ")
    this.displayConfirmDialog =false;
  }

  onConfirmDialogHide(){

  }
  

  compareSets(){
    this.showCompareView.emit("CompareSets");
  }

}
