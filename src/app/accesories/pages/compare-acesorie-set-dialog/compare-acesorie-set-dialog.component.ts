import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccesoriesSharedDataService } from 'src/app/shared/services/accesories-shared-data.service';
import { AccesorieSet } from '../../interfaces/accesories.interfaces';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';

@Component({
  selector: 'app-compare-acesorie-set-dialog',
  templateUrl: './compare-acesorie-set-dialog.component.html',
  styleUrls: ['./compare-acesorie-set-dialog.component.css']
})
export class CompareAcesorieSetDialogComponent implements OnInit{

  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private cd: ChangeDetectorRef,
    private accesorieSetdataSharedService:AccesoriesSharedDataService,
    private messageService: MessageService,
    private router:Router) {}


  accesorieSetToCompare:AccesorieSet[]=[];
  selectedCompareSet:AccesorieSet = AccesorieSet.createSetAux();
  showSet:AccesorieSet = AccesorieSet.createSetAux();
  rechargeCompareSetList:boolean=true;
  listaBonus: ListaBonus[] = [];

  ngOnInit(): void {
    if(this.config.data && this.config.data.accesorieSetToCompare){
      this.accesorieSetToCompare = this.config.data.accesorieSetToCompare;
      this.showSetStats(0,"");
      console.log(this.accesorieSetToCompare)
    }
  }

  compareSets(){
    if(this.accesorieSetToCompare.length > 1){
      this.accesorieSetdataSharedService._accesoriesToCompareList = this.accesorieSetToCompare;
      this.accesorieSetdataSharedService.setShowSetLeft = false; // Establecer en false antes de navegar
      this.accesorieSetdataSharedService.setShowSetRight = false; // Establecer en false antes de navegar
      this.router.navigate(['/accesories/accesoriesComparator']);
    }else{
      this.showError("Add at least 2 sets to list");
      console.log("No puedes comparar");
    }
  }

  showError(text:string) {
    this.messageService.add({ severity: 'error', 
    summary: 'Error', detail: text});
}

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'name', 'contains');
    console.log(elemento2);
  }

  deleteSetFromCompare(rowIndex:number){
    this.accesorieSetToCompare.splice(rowIndex,1);
  }



  showSetStats(index:number,table:string){

    this.showSet=this.accesorieSetToCompare[index];
    console.log(this.showSet);
    this.listaBonus = [];

    this.showSet.bonuses.forEach(bonus =>{
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
}
