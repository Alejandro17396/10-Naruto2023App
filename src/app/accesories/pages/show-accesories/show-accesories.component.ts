import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { AccesorieSet, BonusBonus, ContentBonus, Parte, Tipo } from '../../interfaces/accesories.interfaces';
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
import { TooltipOptions } from 'primeng/tooltip/public_api';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'show-accesories',
  templateUrl: './show-accesories.component.html',
  styleUrls: ['./show-accesories.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class ShowAccesoriesComponent implements OnInit{

  //accesoriesMap: Map<string, AccesorieSet> =new Map<string, AccesorieSet>();
  //bonusesMap: Map<string, ContentBonus> =new Map<string, ContentBonus>();
  partesMap: Map<string, ListaBonus[]> = new Map<string, ListaBonus[]>;
  ngOnInit(): void {
    console.log(this.showAccesories)

    this.accesoriesService.getAllAccesories().subscribe(
      response =>{
        response.content.forEach((set) => {
          this.accesoriesMap.set(set.nombre, set);
         // this.accesories.push(set);
          //let bonus: ContentBonus[] = set.bonuses;

          set.bonuses.forEach((bonus) => {
            if (bonus.tipo === Tipo.Agility) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.Power) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.Chakra) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.Force) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
            if (bonus.tipo === Tipo.FullSetBonus) {
              this.bonusesMap.set(bonus.tipo + " " + set.nombre, bonus);
              return;
            }
          });

          set.partes.forEach((parte)=>{
            let v = this.bonusesMap.get(parte.tipo+" "+set.nombre)?.bonuses;
            if(v){
              this.partesMap.set(parte.nombre,v);
            }
            let v1 = this.bonusesMap.get("full set bonus"+" "+set.nombre)?.bonuses;
            if(v1){
              this.partesMap.set(parte.nombre+"Full",v1);
            }
          });
          
         
        });

      }
    )
  }
  constructor(public dialogService: DialogService,
    private accesoriesService:AccesoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef){
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
  accesoriesMap: Map<string, AccesorieSet> =new Map<string, AccesorieSet>();
  bonusesMap: Map<string, ContentBonus> =new Map<string, ContentBonus>();

 

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

 /* getTooltipText(parte: Parte): string {
    let tooltipText = `${parte.nombre} - ${parte.tipo}: ${parte.valor}`;
    const bonuses = this.showAccesories.bonuses.filter(bonus => bonus.tipo === parte.tipo);
    console.log(bonuses);
    if (bonuses.length > 0) {
      const bonusTexts = bonuses.map(bonus => {
        // Suponiendo que quieres mostrar el primer BonusBonus, o podrías usar un bucle para concatenar todos
        const firstBonus = bonus.bonuses[0];
        //console.log(`${firstBonus.action} ${firstBonus.impact} ${firstBonus.nombreAtributo} ${firstBonus.valor} ${firstBonus.condition} ${firstBonus.time}`)
        //return `${firstBonus.action} ${firstBonus.impact} ${firstBonus.nombreAtributo} ${firstBonus.valor} ${firstBonus.condition} ${firstBonus.time}`;
        return `${firstBonus.nombreAtributo} ${firstBonus.valor} `
      });
  
      // Añade el texto de bonos al texto del tooltip
      tooltipText += ` | Bonuses: ${bonusTexts.join(' | ')}`;
    }
  
    return tooltipText;
  }*/


  selectedPart!:Parte;
  selectedBonuses!: ListaBonus[];
  fullBonuses!: ListaBonus[];
  //console.log(this.bonusesMap);
  //console.log(this.accesoriesMap);
  showOverlay(event: MouseEvent, op: OverlayPanel, parte: Parte): void {
    this.selectedPart=parte;
    console.log(this.bonusesMap);
    console.log(this.accesoriesMap);
    //console.log(parte)
    console.log(this.partesMap)
    //console.log(parte.tipo+" "+parte.nombre)

    /*set.partes.forEach((parte)=>{
      let v = this.bonusesMap.get(parte.tipo+" "+set.nombre)?.bonuses;
      if(v){
        this.partesMap.set(parte.nombre,v);
      }
      let v1 = this.bonusesMap.get("full set bonus"+" "+set.nombre)?.bonuses;
      if(v1){
        this.partesMap.set(parte.nombre+"Full",v1);
      }
    });*/


    let v = this.partesMap.get(parte.nombre);
    if(v){
      this.selectedBonuses = v;
    }

    let v1 = this.partesMap.get(parte.nombre+"Full");
    if(v1){
      this.fullBonuses = v1;
    }
    /*console.log(this.partesMap.get(parte.nombre));
    this.selectedBonuses = this.showAccesories.bonuses
    .filter(bonus => bonus.tipo === parte.tipo)
    .map(bonus => bonus.bonuses)
    .flat(); 

    this.fullBonuses = this.showAccesories.bonuses
    .filter(bonus => bonus.tipo === Tipo.FullSetBonus)
    .map(bonus => bonus.bonuses)
    .flat();*/

    op.show(event);
    this.cdr.detectChanges(); 
    // Aquí puedes asignar los datos de 'parte' al OverlayPanel si es necesario
  }

  showOverlay2(event: MouseEvent, overlayPanel: OverlayPanel) {
    overlayPanel.toggle(event);
  }


  getTooltipText(parte: Parte): string {
    let tooltipText = `${parte.nombre} \n ${parte.tipo}: ${parte.valor}`;
    const matchingBonuses = this.showAccesories.bonuses.find(bonus => bonus.tipo === parte.tipo)?.bonuses;
  
    if (matchingBonuses && matchingBonuses.length > 0) {
      // Agregar un contador para cada bono
      const bonusTexts = matchingBonuses.map((bonus, index) => 
        `${index + 1}- ${bonus.nombreAtributo} ${bonus.valor}`
      ).join('\n'); // Une todos los textos de bonus con un salto de línea y un número al principio
      
      //tooltipText += `\n${bonusTexts}`;
    }
  
    return tooltipText;
  }
  
 /* tooltipOptions: TooltipOptions = {
    position: 'right',
    style: {
      maxWidth: '300px',
      whiteSpace: 'pre-wrap'
    },
    styleClass: 'custom-tooltip'
  };*/

  
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
