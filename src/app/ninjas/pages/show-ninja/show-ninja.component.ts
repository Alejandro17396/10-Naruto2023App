import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NinjasService } from '../../services/ninjas-service.service';
import { Filters, ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { Ninja, SkillType } from '../../interfaces/Ninja.interfaces';
import { FilterSetPanelComponent } from 'src/app/sets/pages/filter-set-panel/filter-set-panel.component';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';

@Component({
  selector: 'show-ninja',
  templateUrl: './show-ninja.component.html',
  styleUrls: ['./show-ninja.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class ShowNinjaComponent implements OnInit{

  ngOnInit(): void {
    this.setShowNinja(this.showNinja);
   
  }


  setShowNinja(ninja:Ninja){
    console.log(ninja);
    this.showNinja = ninja;
    let mapa : Map<string,ListaBonus[]> = new Map<string,ListaBonus[]>();
    this.showNinja.skills.forEach(skill =>{
      if(skill.type === SkillType.Talent){
        this.listaBonus = [];
        skill.attributes.forEach( attribute =>{
         let aux :ListaBonus = ListaBonusUtils.AttributeNinjaToListaBonus(attribute);
         this.listaBonus.push(aux);
        });
        this.listaBonus.forEach(bonus =>{
          let value:ListaBonus []|undefined;
          if(bonus.action){
            value = mapa.get(bonus.action);
          }
           
          if(value){
            value.push(bonus);
            if(bonus.action){
              mapa.set(bonus.action,value)
            }
          }else{
            value = [];
            value.push(bonus);
            if(bonus.action){
              mapa.set(bonus.action,value)
            } 
          }
        })
        console.log(mapa);
        this.mapaBonuses = mapa;
      }
    });
   /* this.showStats = false;
    setTimeout(() => {
      this.showStats = true;
    }, 0);*/
    this.cdr.detectChanges();
  }

  constructor(public dialogService: DialogService,
    private ninjasService:NinjasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef){}

  @Input() showNinja:Ninja = Ninja.createNinja();
  
  @Input() listaBonus!: ListaBonus[];
  @Input() attributesFilterList!:BonusAttribute[];
  @Input() showButtons:boolean = true;
  @Output() ninjasChanged: EventEmitter<Ninja[]>= new EventEmitter<Ninja[]>() ;
  @Output() showCompareView: EventEmitter<string>= new EventEmitter<string>() ;
            ninjas:Ninja[]=[];
            mapaBonuses : Map<string,ListaBonus[]> = new Map<string,ListaBonus[]>();
            loading : boolean = true;
            showStats: boolean = true;
  filter:Filters = {
    order:false,
    filter:false,
    set:"All sets"
  };
  var:string ="wwk";
  setFilter!:Ninja;// = new AccesorieSet("",[],[]);
  displayConfirmDialog:boolean = false;
    
  ref!: DynamicDialogRef;


  showFilterPanel(){
    /*const data = {
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
    });*/
  }

  compareSets(){
    //this.showCompareView.emit("CompareSets");

  }

  generateComboSets(){
   /* if(this.attributesFilterList.length === 0){
      this.showError();
    }else{
      let attributes : Atributo [] = [];
      let order : Atributo [] = [];
      let attributesFilter : ListaBonus [] = [];
      this.attributesFilterList.forEach(attribute =>{
        attributes.push({nombre:attribute.name});
        order.push({nombre:attribute.name});
        attributesFilter.push({nombreAtributo:attribute.name,valor:attribute.value});
      });

      this.ninjasService.getAccesoriesComboSets(
        attributes,order,attributesFilter,
        this.filter
      ).subscribe( response =>{
        console.log(response.sets);
        this.accesories = response.sets;
        this.setsChanged.emit(this.accesories);
      } );
      this.showSuccess();
    }*/
  }

  mostrarResultados(){
    const data = {
      showSet:this.showNinja
    };

   /* this.ref = this.dialogService.open(ConfirmDialogAccesorieSetComponent, {
      header: 'Set filter conditions',
      width: '20%',
      height:'20%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });*/
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
