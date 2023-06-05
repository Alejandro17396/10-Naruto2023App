import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormationElement } from '../../interfaces/formations.interface';
import { FormationsSharedDataService } from '../../services/formations-shared-data.service';

@Component({
  selector: 'view-formations-differences',
  templateUrl: './view-formations-differences.component.html',
  styleUrls: ['./view-formations-differences.component.css']
})
export class ViewFormationsDifferencesComponent implements OnInit{
  ngOnInit(): void {
    if(this.formationPosition === 1){
      this.setLeft();
      this.position = 'left';
    }else{
      this.setRight();
      this.position = 'right';
    }
  }

  setLeft(){
    this.formationsSharedDataService.getFormationLeft.subscribe(
      response =>{
        this.formation = response;
        console.log("soy el izquierdo y me ponen " + response.formationNinjas);
        console.log(this.formation.mergedTalentAttributes);
      }
    );
    this.formationsSharedDataService.getShowFormationLeft.subscribe(
      response =>{
        this.formationReady = response;
      }
    );
    this.cdr.detectChanges();
  }

  setRight(){
    this.formationsSharedDataService.getFormationRight.subscribe(
      response =>{
        this.formation = response;
        console.log("soy el derecho y me ponen " + response.formationNinjas);
        console.log(this.formation.mergedTalentAttributes);
      }
    );
    this.formationsSharedDataService.getShowFormationRight.subscribe(
      response =>{
        this.formationReady = response;
      }
    );
    this.cdr.detectChanges();
  }

  constructor(private formationsSharedDataService:FormationsSharedDataService,
              private cdr: ChangeDetectorRef){}

  @Input() formationPosition!:number;
  position:string = "";
  formationReady:boolean = false;
  formation:FormationElement = FormationElement.createFormation();
}
