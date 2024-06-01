import { Component, OnInit,Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SetsResponsePaginated ,Set, ListaBonus, Pageable, SearchSetsByFilter, Pageable_} from '../../interfaces/set.interfaces';
import { SetsService } from '../../services/sets.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FilterSetPanelComponent } from '../filter-set-panel/filter-set-panel.component';
import { BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { Router } from '@angular/router';
import { SetSharedDataService } from 'src/app/shared/services/set-shared-data.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';

@Component({
  selector: 'app-search-sets',
  templateUrl: './search-sets.component.html',
  styleUrls: ['./search-sets.component.css'],
  providers: [DialogService,MessageService]
})
export class SearchSetsComponent implements OnInit{
    ngOnInit(): void {
      this.showSet = this.createSetAux();
      this.showSet.bonuses.forEach(bonus =>{
        bonus.listaBonus.forEach(bonusAt =>{
          this.listaBonus.push(bonusAt);
        })
      });
      
      this.attributesFilterList = [
        {
          name:'attack',
          value:50
        },
        {
          name:'HP',
          value:0
        },
        {
          name:'avoid injury rate',
          value:0
        },
        {
          name:'damage rate',
          value:0
        }
      ];

      this.listaBonus.sort(function(a, b) {
        if (a.nombreAtributo.length < b.nombreAtributo.length) {
          return -1;
        }
        if (a.nombreAtributo.length > b.nombreAtributo.length) {
          return 1;
        }
        return 0;
      });

      this.setService.getSets().subscribe(
        response => {
          this.loading = true;
          this.tableContent=response;
          this.sets=response.content;
          this.totalRecords = response.size;
          this.loading = false;
          console.log("contenido")
          console.log(response.content);
        }
      );

      let page:Pageable_ = {page:0,size:8}
      this.setService.getSetsPagination(page,this.textoFiltro).subscribe(
        response => {
            //this.sets = [...this.sets, ...response.content];
            this.sets = response.content;
            this.totalRecords = response.totalElements;
            console.log("Se ha buscado"+page.page +"  numero de elementos "+page.size)
            console.log(this.sets)
        },
        error => {
            // Manejar el error aquí...
        }
      );

      this.responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        }
    ];

    }

    tableContent? : SetsResponsePaginated;
    sets : Set[]= [];
    setsToCompare : Set[]= [];
    selectedSet : Set = new Set();
    selectedCompareSet : Set = new Set();
    checked: boolean = true;
    attributesFilterList:BonusAttribute[]=[];
    ref!: DynamicDialogRef;
    rechargeCompareSetList:boolean = false;
    rechargeSetList:boolean = true;
    showSet:Set = new Set();
    listaBonus: ListaBonus[] = [];
    responsiveOptions: any[] =[];
    @Output() setsCompareChanged: EventEmitter<Set[]>= new EventEmitter<Set[]>() ;

    constructor(
              private setService:SetsService,
              private router:Router,
              private setdataSharedService:SetSharedDataService,
              public dialogService: DialogService,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef){}

    verSet(set:Set){

    }

    showSetStats(table:string,showSet:Set){

      this.showSet = JSON.parse(JSON.stringify(showSet));
      this.listaBonus = [];

      this.showSet.bonuses.forEach(bonus =>{
        bonus.listaBonus.forEach(bonusAt =>{
          this.listaBonus.push(bonusAt);
        })
      });

      this.listaBonus.sort(function(a, b) {
        if (a.nombreAtributo.length < b.nombreAtributo.length) {
          return -1;
        }
        if (a.nombreAtributo.length > b.nombreAtributo.length) {
          return 1;
        }
        return 0;
      });

    }

    

    deleteSetFromCompare2(rowIndex:number){
      this.setsToCompare.splice(rowIndex,1);
    }

    deleteSetFromCompare(deleteSet:Set){
      const index = this.setsToCompare.indexOf(deleteSet);
      if (index > -1) {
        this.setsToCompare.splice(index, 1);
      }
    }

    addSetToCompare2(index:number){
      const set = this.sets[index];
      const setExisteEnLista = this.setsToCompare.includes(set);

      if (!setExisteEnLista) {
        this.setsToCompare.push(set);

        this.rechargeCompareSetList = false;
        setTimeout(() => {
          this.rechargeCompareSetList = true;
        }, 0);
      }

      console.log(this.setsToCompare.length);
      console.log(this.setsToCompare)
    }

    addSetToCompare(set_: Set) {
      const set = JSON.parse(JSON.stringify(set_));
      // Comprobar si el set ya existe basándose en el nombre
      const setExisteEnLista = this.setsToCompare.some(existingSet => existingSet.nombre === set.nombre);
    
      if (!setExisteEnLista) {
        this.setsToCompare.push(set);
    
        // Reiniciar la lista de comparación para forzar la actualización de la vista
        this.rechargeCompareSetList = false;
        setTimeout(() => {
          this.rechargeCompareSetList = true;
        }, 0);
      }
    
      console.log(this.setsToCompare.length);
      console.log(this.setsToCompare);
    }
    

    /*showFilterPanel(){ 
      this.ref = this.dialogService.open(FilterSetPanelComponent, {
        header: 'Set filter conditions',
        width: '80%',
        height:'80%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: this.attributesFilterList
    });

    }*/

    loading:boolean = true;
    totalRecords:number =0;
    tablaElements:string = "base";
    loadSetsLazy(event: LazyLoadEvent) {
      if(this.tablaElements !== 'base'){
        this.loadComboSetsLazy(event);
      }else{
        this.loadSetsBaseLazy(event);
      }

    }

    textoFiltro:string = "";
    @ViewChild('setsTable') table: any;
    filter(event: any,elemento2:any){
      this.textoFiltro = event.target?.value || "";
      this.table.reset();
      if(this.tablaElements !== 'base'){
        this.loadComboSetsLazy({first: 0, rows: 8});
      }else{
        this.loadSetsBaseLazy({first: 0, rows: 8});
      }
    }

    loadComboSetsLazy(event: LazyLoadEvent) {
      this.loading = true;
      console
      // La página actual se calcula a partir del primer registro que se necesita
      if(event.first && event.rows){
        let page:Pageable_ ={page:0,size:0};
        page.page = Math.floor(event.first / event.rows) +1;
        page.size = event.rows
        this.setService.getComboSets(
          this.filtro.attributes, this.filtro.order, this.filtro.attributesFilter,
          this.filtro.filters,page,this.textoFiltro
        ).subscribe(
            response => {
                //this.sets = [...this.sets, ...response.content];
                this.sets = response.sets;
                this.totalRecords = response.number;
            },
            error => {
                // Manejar el error aquí...
            }
        );
        }else{
          let page:Pageable_ ={page:0,size:8}; 
          this.setService.getComboSets(
            this.filtro.attributes, this.filtro.order, this.filtro.attributesFilter,
            this.filtro.filters,page,this.textoFiltro
          ).subscribe(
              response => {

                  this.sets = response.sets;
                  this.totalRecords = response.number;
              },
              error => {
                  // Manejar el error aquí...
              }
          );
        }
        this.loading = false;
  }

    loadSetsBaseLazy(event: LazyLoadEvent) {
      this.loading = true;
      if(event.first && event.rows){
        let page:Pageable_ ={page:0,size:0};
        page.page = Math.floor(event.first / event.rows);
        page.size = event.rows
        this.setService.getSetsPagination(page,this.textoFiltro).subscribe(
            response => {
                this.sets = response.content;
                this.totalRecords = response.totalElements;
            },
            error => {
                // Manejar el error aquí...
            }
        );
        }else{
          let page:Pageable_ ={page:0,size:8}; 
          this.setService.getSetsPagination(page,this.textoFiltro).subscribe(
              response => {

                  this.sets = response.content;
                  this.totalRecords = response.totalElements;
              },
              error => {
                  // Manejar el error aquí...
              }
          );
        }
        this.loading = false;
  }
  

  //SearchSetsByFilter
    handleDataFromChild2(newSets:Set[]){
      this.sets = newSets;
      this.rechargeSetList = false;
        setTimeout(() => {
          this.rechargeSetList = true;
        }, 0);
    }

    filtro!:SearchSetsByFilter;
    handleDataFromChild(filtro:SearchSetsByFilter){
      this.filtro = filtro;
      this.tablaElements = filtro.type;
      let page:Pageable_ ={page:1,size:8};
      this.setService.getComboSets(
        filtro.attributes,filtro.order,filtro.attributesFilter,
        filtro.filters,page,this.textoFiltro
      ).subscribe( response =>{
        this.totalRecords = response.number;
        this.sets = response.sets;
        this.rechargeSetList = false;
          setTimeout(() => {
            this.rechargeSetList = true;
          }, 0);
      } );
      
    }

    compareSets(cadena:string){
      
      if(this.setsToCompare.length>1){
        this.setdataSharedService.SetsToCompareList=this.setsToCompare;
        this.setdataSharedService.setShowSetLeft = false; // Establecer en false antes de navegar
        this.setdataSharedService.setShowSetRight = false; // Establecer en false antes de navegar
        this.router.navigate(['/sets/setsComparator']);
        this.showSuccess();
      }else{
        this.showError();
        console.log("No puedes comparar");
      }
      
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

    createSetAux() {
      let url = {
        "nombre": "curse seal set",
        "partes": [
            {
                "nombre": "curse seal armor",
                "atributo": {
                    "nombre": "physical defense"
                },
                "valor": 54000,
                "image": null
            },
            {
                "nombre": "curse seal belt",
                "atributo": {
                    "nombre": "power"
                },
                "valor": 560000,
                "image": null
            },
            {
                "nombre": "curse seal boots",
                "atributo": {
                    "nombre": "speed"
                },
                "valor": 55000,
                "image": null
            },
            {
                "nombre": "curse seal coat",
                "atributo": {
                    "nombre": "strategy defense"
                },
                "valor": 54000,
                "image": null
            },
            {
                "nombre": "curse seal headband",
                "atributo": {
                    "nombre": "physical defense"
                },
                "valor": 54000,
                "image": null
            },
            {
                "nombre": "curse seal kunai",
                "atributo": {
                    "nombre": "physical attack"
                },
                "valor": 55000,
                "image": null
            },
            {
                "nombre": "curse seal scroll",
                "atributo": {
                    "nombre": "strategy attack"
                },
                "valor": 55000,
                "image": null
            },
            {
                "nombre": "curse seal shuriken",
                "atributo": {
                    "nombre": "physical attack"
                },
                "valor": 55000,
                "image": null
            }
        ],
        "bonuses": [
            {
                "nombre": "2 effect : ",
                "listaBonus": [
                    {
                        "nombreAtributo": "agility",
                        "valor": 22000,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends",
                        "color": null,
                        "atributo": {
                            "nombre": "agility"
                        }
                    },
                    {
                        "nombreAtributo": "damage rate",
                        "valor": 30,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends",
                        "color": null,
                        "atributo": {
                            "nombre": "damage rate"
                        }
                    }
                ]
            },
            {
                "nombre": "4 effect : ",
                "listaBonus": [
                    {
                        "nombreAtributo": "agility",
                        "valor": 28000,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends",
                        "color": null,
                        "atributo": {
                            "nombre": "agility"
                        }
                    },
                    {
                        "nombreAtributo": "damage rate",
                        "valor": 30,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends",
                        "color": null,
                        "atributo": {
                            "nombre": "damage rate"
                        }
                    },
                    {
                        "nombreAtributo": "weaken enemy attack",
                        "valor": 35,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends",
                        "color": null,
                        "atributo": {
                            "nombre": "weaken enemy attack"
                        }
                    }
                ]
            },
            {
                "nombre": "6 effect : ",
                "listaBonus": [
                    {
                        "nombreAtributo": "after using skill, recovers himself HP by 40%",
                        "valor": 0,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends",
                        "color": null,
                        "atributo": {
                            "nombre": "after using skill, recovers himself HP by 40%"
                        }
                    },
                    {
                        "nombreAtributo": "avoid injury rate",
                        "valor": 30,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends",
                        "color": null,
                        "atributo": {
                            "nombre": "avoid injury rate"
                        }
                    },
                    {
                        "nombreAtributo": "HP",
                        "valor": 20,
                        "action": "increase",
                        "impact": "self",
                        "condition": "ninja is alive",
                        "time": "battle ends",
                        "color": null,
                        "atributo": {
                            "nombre": "HP"
                        }
                    }
                ]
            }
        ]
    };
  
      return Object.assign(new Set(), url);
    }

}
