import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ninja, NinjaFilter,Attribute as NinjaAttribute, Skill } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { enviroments } from 'src/enviroments/enviroments';
import { FormationElement, FormationResponsePaginated } from '../../interfaces/formations.interface';
import { FormationService } from '../../services/formation.service';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FilterFormationsPanelComponent } from '../filter-formations-panel/filter-formations-panel.component';
import { Filters } from 'src/app/sets/interfaces/set.interfaces';
import { FilterNinjaPanelComponent } from 'src/app/ninjas/pages/filter-ninja-panel-component/filter-ninja-panel-component.component';

@Component({
  selector: 'app-formations-list',
  templateUrl: './formations-list.component.html',
  styleUrls: ['./formations-list.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class FormationsListComponent implements OnInit{

  
  ngOnInit(): void {

    this.attributesFilterList.push(
      { attributeName:"attack",
        action:"increase",
        impact:"all allies",
        condition:"ninja is alive",
        value:30 }
    );
    this.attributesFilterList.push(
      { attributeName:"attack",
        action:"decrease",
        impact:"all enemies",
        condition:"ninja is alive",
        value:30 }
    );
    this.inicio();
  }

  attributesFilterList:NinjaAttribute [] = [];
  ninja!:Ninja;
  constructor(private formationsService:FormationService,
              public dialogService: DialogService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private cdr: ChangeDetectorRef){

  }


  inicio(){
    let finalFilter : NinjaFilter = new NinjaFilter();
    this.attributesFilterList.forEach(
      response =>{
        finalFilter.filters.push(ListaBonusUtils.AttributeToFilter(response));
      }
    );
    finalFilter.formationNumNinjas = 4;
    this.formationsService.createFormation(finalFilter,true,true).subscribe(
      response=>{
        this.formations = response.formations;
        this.showFormation = response.formations[0];
      }
    );
    this.skillsShow = this.showFormation.supports[0].skills;
  }
  

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'name', 'contains');
    console.log(elemento2);
  }

  changeShowFormation(formation:FormationElement,rowIndex:number){
    this.showFormation= formation;
    this.skillsShow = this.showFormation.supports[0].skills;
  }

  changeFormations(formations:FormationElement[]){
    this.formations = formations;
  }

  addToComapreList(formation:FormationElement){
    this.formationsToCompare.push(formation);
  }
  
  deleteFromCompareList(formation: FormationElement) {
    const index = this.formationsToCompare.indexOf(formation);
    
    if (index !== -1) {
      this.formationsToCompare.splice(index, 1);
    }
  }

  formations:FormationElement[]=[];

  selectedFormation!:FormationElement;
  showFormation:FormationElement = FormationElement.createFormation();
  skillsShow:Skill []=[];
  formationsToCompare:FormationElement[] = [];
  
}
