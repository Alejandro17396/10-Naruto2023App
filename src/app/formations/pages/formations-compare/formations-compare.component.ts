import { Component, OnInit } from '@angular/core';
import { CompareFormations, FormationElement } from '../../interfaces/formations.interface';
import { Ninja, NinjaFilter,Attribute as NinjaAttribute, Skill } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { FormationService } from '../../services/formation.service';
import { FormationsSharedDataService } from '../../services/formations-shared-data.service';
import { Pageable_ } from 'src/app/sets/interfaces/set.interfaces';

@Component({
  selector: 'app-formations-compare',
  templateUrl: './formations-compare.component.html',
  styleUrls: ['./formations-compare.component.css']
})
export class FormationsCompareComponent implements OnInit{
  ngOnInit(): void {
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
      this.formationsSharedDataService.getFormationsToCompareList.subscribe(
        response =>{
          if(response.length > 0){
            this.formations = response;
          }else{
            this.createFormationExample();
          }
        }
      )
  }

  createFormationExample(){
      let finalFilter : NinjaFilter = new NinjaFilter();
      this.attributesFilterList.forEach(
        response =>{
          finalFilter.filters.push(ListaBonusUtils.AttributeToFilter(response));
        }
      );
      finalFilter.formationNumNinjas = 4;
      let page:Pageable_ = {page:0,size:8};
      this.formationsService.createFormation(finalFilter,true,true,page,true,false).subscribe(
        response=>{
          this.formations = response.formations;
        }
      );
  }

  responsiveOptions: any[] =[];
  formations:FormationElement [] = [];
  attributesFilterList:NinjaAttribute [] = [];
  formationLeft!:FormationElement;
  formationViewLeft!:FormationElement;
  formationRight!:FormationElement;
  formationViewRight!:FormationElement;

  constructor(private formationsService:FormationService,
              private formationsSharedDataService:FormationsSharedDataService){

}

  changeFormationRight(formation:FormationElement){
    this.formationRight = JSON.parse(JSON.stringify(formation));
    let formations:CompareFormations = {
      formationLeft:this.formationLeft,
      formationRight:formation
    }

    this.formationsService.compareFormations(formations,true).subscribe(
      response =>{
        if(response.formationLeft){
          this.formationsSharedDataService.setFormationLeft = response.formationLeft;
        }
        if(response.formationRight){
          this.formationsSharedDataService.setFormationRight = response.formationRight;
        }
      }
    );
  }

  changeFormationLeft(formation:FormationElement){
    this.formationLeft = JSON.parse(JSON.stringify(formation));
    let formations:CompareFormations = {
      formationLeft:formation,
      formationRight:this.formationRight
    }

    this.formationsService.compareFormations(formations,true).subscribe(
      response =>{
        if(response.formationLeft){
          this.formationsSharedDataService.setFormationLeft = response.formationLeft;
        }
        if(response.formationRight){
          this.formationsSharedDataService.setFormationRight = response.formationRight;
        }
      }
    );
  }

}
 