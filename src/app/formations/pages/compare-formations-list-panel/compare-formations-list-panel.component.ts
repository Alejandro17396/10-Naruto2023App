import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormationElement } from '../../interfaces/formations.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { FormationsSharedDataService } from '../../services/formations-shared-data.service';

@Component({
  selector: 'app-compare-formations-list-panel',
  templateUrl: './compare-formations-list-panel.component.html',
  styleUrls: ['./compare-formations-list-panel.component.css']
})
export class CompareFormationsListPanelComponent implements OnInit{

  ngOnInit(): void {
    this.formations = this.config.data.formations;
    if(this.formations.length>0){
      this.showFormation = this.formations[0];
    }
  }

  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private cd: ChangeDetectorRef,
    private router:Router,
    private formationsSharedDataService:FormationsSharedDataService) {}

  showFormation!:FormationElement; //= FormationElement.createFormation();
  formations:FormationElement [] = [];
  selectedFormation:FormationElement = FormationElement.createFormation();

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'name', 'contains');
    console.log(elemento2);
  }

  deleteFormationFromList(formation:FormationElement,rowIndex:number){
    const index = this.formations.indexOf(formation);
      
    if (index !== -1) {
      this.formations.splice(index, 1);
    }
  }

  ChangeShowFormation(formation:FormationElement){
    this.showFormation= formation;
  }

  compareFormations(){
    if(this.formations.length>1){
     // this.setdataSharedService.SetsToCompareList=this.setsToCompare;
     // this.setdataSharedService.setShowSetLeft = false; // Establecer en false antes de navegar
     // this.setdataSharedService.setShowSetRight = false; // Establecer en false antes de navegar
     this.formationsSharedDataService.setFormationsToCompareList = this.formations;
      this.router.navigate(['/formations/FormationsComparator']);
      this.ref.close()
    }else{
      console.log("No puedes comparar");
    }
  }
}
