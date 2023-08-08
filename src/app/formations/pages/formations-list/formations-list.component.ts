import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ninja, NinjaFilter,Attribute as NinjaAttribute, Skill } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { enviroments } from 'src/enviroments/enviroments';
import { FormationElement, FormationResponsePaginated, SearchFormationFilter } from '../../interfaces/formations.interface';
import { FormationService } from '../../services/formation.service';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { FilterFormationsPanelComponent } from '../filter-formations-panel/filter-formations-panel.component';
import { Filters, Pageable_ } from 'src/app/sets/interfaces/set.interfaces';
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
    /*this.attributesFilterList.push(
      { attributeName:"attack",
        action:"decrease",
        impact:"all enemies",
        condition:"ninja is alive",
        value:30 }
    );*/
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
    let page:Pageable_ = {page:0,size:8};
    this.filtro={
      filter:finalFilter,
      sorted:true,
      filtred:true,
      awakening:true,
      or:true
    }
    this.formationsService.createFormation(finalFilter,true,true,page,true,true).subscribe(
      response=>{
        this.loading=true;
        this.formations = response.formations;
        this.showFormation = response.formations[0];
        this.totalRecords = response.numFormations;
        console.log(this.totalRecords);
        this.loading = false;
      }
    );
    this.skillsShow = this.showFormation.supports[0].skills;
  }
  
  loadSetsLazy(event: LazyLoadEvent) {
    this.loading = true;
    // La página actual se calcula a partir del primer registro que se necesita 
    if(event.first && event.rows){
      console.log("combo no principio");
      let page:Pageable_ ={page:0,size:0};
      page.page = Math.floor(event.first / event.rows) +1;
      page.size = event.rows
      this.formationsService.createFormation(this.filtro.filter,this.filtro.sorted,
        this.filtro.filtred,page,this.filtro.awakening,this.filtro.or).subscribe(
        response=>{
          this.loading=true;
          this.formations = response.formations;
          this.showFormation = response.formations[0];
          this.totalRecords = response.numFormations;
          console.log(this.totalRecords);
          this.loading = false;
        },
          error => {
              // Manejar el error aquí...
          }
      );
      }else{
        console.log("combo si principio");
        let page:Pageable_ ={page:0,size:8}; 
        this.formationsService.createFormation(this.filtro.filter,this.filtro.sorted,
          this.filtro.filtred,page,this.filtro.awakening,this.filtro.or).subscribe(
          response=>{
            this.loading=true;
            this.formations = response.formations;
            this.showFormation = response.formations[0];
            this.totalRecords = response.numFormations;
            console.log(this.totalRecords);
            this.loading = false;
          },
          error => {
              // Manejar el error aquí...
          }
        );
      }
      this.loading = false;
  }

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'name', 'contains');
    console.log(elemento2);
  }

  changeShowFormation(formation:FormationElement,rowIndex:number){
    this.showFormation= formation;
    this.skillsShow = this.showFormation.supports[0].skills;
  }

  filtro!:SearchFormationFilter;
  tablaElements:string = "base";
  changeFormations(filtro:SearchFormationFilter){
    this.filtro = filtro;
    this.tablaElements = "filtro.type";
    let page:Pageable_ ={page:1,size:8};
    this.formationsService.createFormation(filtro.filter,filtro.sorted,filtro.filtred
      ,page,filtro.awakening,filtro.or).subscribe(
      response=>{
        this.loading=true;
        this.formations = response.formations;
        this.showFormation = response.formations[0];
        this.totalRecords = response.numFormations;
        console.log(this.totalRecords);
        this.loading = false;
      }
    );
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
  loading:boolean = false;
  totalRecords:number =0;
  selectedFormation!:FormationElement;
  showFormation:FormationElement = FormationElement.createFormation();
  skillsShow:Skill []=[];
  formationsToCompare:FormationElement[] = [];
  
}
