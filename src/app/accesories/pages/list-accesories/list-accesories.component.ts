import { Component, OnInit } from '@angular/core';
import { AccesoriesService } from '../../services/accesories.service';
import { AccesorieSet } from '../../interfaces/accesories.interfaces';
import { BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { AccesoriesSharedDataService } from '../../../shared/services/accesories-shared-data.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-accesories',
  templateUrl: './list-accesories.component.html',
  styleUrls: ['./list-accesories.component.css'],
  providers: [DialogService,MessageService]
})
export class ListAccesoriesComponent implements OnInit{

  ngOnInit(): void {
    console.log(this.showAccesories);
    this.showAccesories = AccesorieSet.createSetAux();
    this.showAccesories.bonuses.forEach(bonus =>{
     bonus.bonuses.forEach((bonusAt: ListaBonus) =>{
        this.listaBonus.push(bonusAt);
      })
      console.log(this.showAccesories);
    });

    this.accesoriesService.getAccesories().subscribe(
      response =>{
        this.accesories = response.content;
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
  }

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'nombre', 'contains');
    console.log(elemento2);
  }

  

  addAccesorieSetToCompare(index:number){
    const set = this.accesories[index];
    const setExisteEnLista = this.accesoriesToCompare.includes(set);

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

  handleDataFromChild(newAccesories:AccesorieSet[]){
    this.accesories = newAccesories;
    this.rechargeAccesoriesSetList = false;
      setTimeout(() => {
        this.rechargeAccesoriesSetList = true;
      }, 0);
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

  showAccesorieSetStats(index:number,table:string){

    if(table === 'setCompareList'){
      this.showAccesories=this.accesoriesToCompare[index];
    }else{
      this.showAccesories=this.accesories[index];
    }

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
