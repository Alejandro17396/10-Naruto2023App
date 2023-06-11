import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SetSharedDataService } from 'src/app/shared/services/set-shared-data.service';
import { ListaBonus, Set } from '../../interfaces/set.interfaces';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-compare-sets-dialog',
  templateUrl: './compare-sets-dialog.component.html',
  styleUrls: ['./compare-sets-dialog.component.css']
})
export class CompareSetsDialogComponent implements OnInit{

  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private cd: ChangeDetectorRef,
    private setdataSharedService:SetSharedDataService,
    private messageService: MessageService,
    private router:Router) {}


  setsToCompare:Set[]=[];
  selectedCompareSet:Set = Set.crearAuxSet();
  showSet:Set = Set.crearAuxSet();
  rechargeCompareSetList:boolean=true;
  listaBonus: ListaBonus[] = [];

  ngOnInit(): void {
    if(this.config.data && this.config.data.sets ){
      //&& this.config.data.sets.length > 0){
      this.setsToCompare = this.config.data.sets;
      //this.showSet = this.setsToCompare[0];
      this.showSetStats(0,"");
      console.log(this.setsToCompare)
    }
  }

  compareSets(){
    if(this.setsToCompare.length>1){
      this.setdataSharedService.SetsToCompareList=this.setsToCompare;
      this.setdataSharedService.setShowSetLeft = false; // Establecer en false antes de navegar
      this.setdataSharedService.setShowSetRight = false; // Establecer en false antes de navegar
      this.router.navigate(['/sets/setsComparator']);
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
    this.setsToCompare.splice(rowIndex,1);
  }

  showSetStats(index:number,table:string){

    this.showSet=this.setsToCompare[index];
    console.log(this.showSet);
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
}
