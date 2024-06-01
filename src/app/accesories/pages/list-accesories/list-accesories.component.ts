import { Component, OnInit, ViewChild } from '@angular/core';
import { AccesoriesService } from '../../services/accesories.service';
import { AccesorieSet } from '../../interfaces/accesories.interfaces';
import { BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { IntensityFilter, ListaBonus, Pageable_, SearchSetsByFilter } from 'src/app/sets/interfaces/set.interfaces';
import { AccesoriesSharedDataService } from '../../../shared/services/accesories-shared-data.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { LazyLoadEvent, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-accesories',
  templateUrl: './list-accesories.component.html',
  styleUrls: ['./list-accesories.component.css'],
  providers: [DialogService,MessageService]
})
export class ListAccesoriesComponent implements OnInit{

  ngOnInit(): void {
    this.showAccesories = AccesorieSet.createSetAux();
    this.showAccesories.bonuses.forEach(bonus =>{
     bonus.bonuses.forEach((bonusAt: ListaBonus) =>{
        this.listaBonus.push(bonusAt);
      });
    });

    let page:Pageable_ ={page:0,size:8};
    this.accesoriesService.getAccesoriesPagination(page,this.textoFiltro).subscribe(
      response =>{
        this.loading = true;
        this.accesories = response.content;
        this.totalRecords = response.totalElements;
        this.loading = false;
      }
    );

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

    console.log(this.listaBonus);
    this.listaBonus.sort(function(a, b) {
      if (a.nombreAtributo.length < b.nombreAtributo.length) {
        return -1;
      }
      if (a.nombreAtributo.length > b.nombreAtributo.length) {
        return 1;
      }
      return 0;
    });
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

  

  addAccesorieSetToCompare(accesorieSet:AccesorieSet){
    const set = JSON.parse(JSON.stringify(accesorieSet));
    const setExisteEnLista = this.accesoriesToCompare.some(existingSet => existingSet.nombre === set.nombre);

    console.log(set)
    if (!setExisteEnLista) {
      this.accesoriesToCompare.push(set);

      this.rechargeCompareAccesoriesSetList = false;
      setTimeout(() => {
        this.rechargeCompareAccesoriesSetList = true;
      }, 0);
    }

    console.log(this.accesoriesToCompare.length)
  }

  accesories:AccesorieSet[] = [];
  accesoriesToCompare:AccesorieSet[] = [];
  rechargeAccesoriesSetList:boolean = true;
  rechargeCompareAccesoriesSetList:boolean = true;
  selectedAccesorie!:AccesorieSet;
  selectedCompareAccesorieSet!:AccesorieSet;
  showAccesories:AccesorieSet = AccesorieSet.createSetAux();
  listaBonus: ListaBonus[] = [];
  attributesFilterList:BonusAttribute[]=[];
  loading:boolean = false;
  totalRecords:number = 0;
  textoFiltro:string = "";
  tablaElements:string = "base";
  responsiveOptions: any[] =[];
  @ViewChild('accesoriesTable') accesoriesTable: any;

  loadSetsLazy(event: LazyLoadEvent) {
    if(this.tablaElements !== 'base'){
      this.loadComboSetsLazy(event);
    }else{
      this.loadSetsBaseLazy(event);
    }

  }

  filter(event: any,elemento2:any){
    this.textoFiltro = event.target?.value || "";
    this.accesoriesTable.reset();
    if(this.tablaElements !== 'base'){
      this.loadComboSetsLazy({first: 0, rows: 8});
    }else{
      this.loadSetsBaseLazy({first: 0, rows: 8});
    }
  }

    loadComboSetsLazy(event: LazyLoadEvent) {
      this.loading = true;
      if(event.first && event.rows){
        let page:Pageable_ ={page:0,size:0};
        page.page = Math.floor(event.first / event.rows) +1;
        page.size = event.rows;
        let intensityfilters:IntensityFilter ={
          intensity: this.filtro.intensity,
          sets: this.filtro.sets,
          startSet: this.filtro.startSet,
          endSet: this.filtro.endSet
        };
        this.accesoriesService.getAccesoriesComboSets(
          this.filtro.attributes, this.filtro.order, this.filtro.attributesFilter,
          page,this.filtro.filters,intensityfilters,this.textoFiltro
        ).subscribe(
            response => {
                this.accesories = response.sets;
                this.totalRecords = response.total;
                this.accesories.forEach(accesorio =>{
                  accesorio.partes.forEach(part =>{
                    part.image = response.partes[part.nombre]?.image; 
                  });
                });
            },
            error => {
                // Manejar el error aquí...
            }
        );
        }else{
          let page:Pageable_ ={page:0,size:8}; 
          let intensityfilters:IntensityFilter ={
            intensity: this.filtro.intensity,
            sets: this.filtro.sets,
            startSet: this.filtro.startSet,
            endSet: this.filtro.endSet
          };
          this.accesoriesService.getAccesoriesComboSets(
            this.filtro.attributes, this.filtro.order, this.filtro.attributesFilter,
            page,this.filtro.filters,intensityfilters,this.textoFiltro
          ).subscribe(
              response => {
                  this.accesories = response.sets;
                  this.totalRecords = response.total;
                  this.accesories.forEach(accesorio =>{
                    accesorio.partes.forEach(part =>{
                      part.image = response.partes[part.nombre]?.image; 
                    });
                  });
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
        this.accesoriesService.getAccesoriesPagination(page,this.textoFiltro).subscribe(
            response => {
                this.accesories = response.content;
                this.totalRecords = response.totalElements;
            },
            error => {
              console.log("he dado error principio")
                // Manejar el error aquí...
            }
        );
        }else{
          let page:Pageable_ ={page:0,size:8}; 
          this.accesoriesService.getAccesoriesPagination(page,this.textoFiltro).subscribe(
              response => {
                  this.accesories = response.content;
                  this.totalRecords = response.totalElements;
              },
              error => {
                console.log("he dado error fin")
              }
          );
        }
        this.loading = false;
  }

  handleDataFromChild2(newAccesories:AccesorieSet[]){
    this.accesories = newAccesories;
    this.rechargeAccesoriesSetList = false;
      setTimeout(() => {
        this.rechargeAccesoriesSetList = true;
      }, 0);
  }

    filtro!:SearchSetsByFilter;
    handleDataFromChild(filtro:SearchSetsByFilter){
      this.filtro = filtro;
      let intensityfilters:IntensityFilter ={
        intensity: filtro.intensity,
        sets: filtro.sets,
        startSet:filtro.startSet,
        endSet:filtro.endSet
      };
      this.tablaElements = filtro.type;
      let page:Pageable_ ={page:1,size:8};
      this.accesoriesService.getAccesoriesComboSets(
        filtro.attributes,filtro.order,filtro.attributesFilter,
        page,filtro.filters,intensityfilters,this.textoFiltro
      ).subscribe( response =>{
        this.totalRecords = response.total;
        this.accesories = response.sets;
        this.accesories.forEach(accesorio =>{
          accesorio.partes.forEach(part =>{
            part.image = response.partes[part.nombre]?.image; 
          });
        });
        this.rechargeAccesoriesSetList = false;
          setTimeout(() => {
            this.rechargeAccesoriesSetList = true;
          }, 0);
      } );
      
    }

  compareSets(cadena:string){
    if(this.accesoriesToCompare.length>1){
      this.accesoriesDataSharedService.accesoriesToCompareList=this.accesoriesToCompare;
      this.accesoriesDataSharedService.setShowSetLeft = false; // Establecer en false antes de navegar
      this.accesoriesDataSharedService.setShowSetRight = false; // Establecer en false antes de navegar
      this.router.navigate(['/accesories/accesoriesComparator']);
    }else{
      this.showError();
      console.log("No puedes comparar");
    }
    
  }

  deleteSetFromCompare(rowIndex:number){
    this.accesoriesToCompare.splice(rowIndex,1);
  }

  showAccesorieSetStats(table:string,accesorieSet:AccesorieSet){

    this.showAccesories = JSON.parse(JSON.stringify(accesorieSet));
    this.listaBonus = [];

    this.showAccesories.bonuses.forEach(bonus =>{
      bonus.bonuses.forEach(bonusAt =>{
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

    console.log(this.listaBonus)
  }

  constructor(private accesoriesService: AccesoriesService,
              private accesoriesDataSharedService:AccesoriesSharedDataService,
              private router:Router,
              public dialogService: DialogService,
              private messageService: MessageService){}

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
