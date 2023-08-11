import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ListaBonus, Pageable_ } from 'src/app/sets/interfaces/set.interfaces';
import { Attribute, BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { Ninja ,Attribute as NinjaAttribute } from '../../interfaces/Ninja.interfaces';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { NinjasService } from '../../services/ninjas-service.service';
import { AccesoriesSharedDataService } from 'src/app/shared/services/accesories-shared-data.service';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';
import { ShowNinjaComponent } from '../show-ninja/show-ninja.component';
import { SearchFormationFilter } from 'src/app/formations/interfaces/formations.interface';

@Component({
  selector: 'app-ninja-list',
  templateUrl: './ninja-list.component.html',
  styleUrls: ['./ninja-list.component.css'],
  providers: [DialogService,MessageService]
})
export class NinjaListComponent implements OnInit{

  constructor(private ninjasService: NinjasService,
    private ninjasDataSharedService: NinjasSharedDataService,
    private router:Router,
    public dialogService: DialogService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef){}

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
    this.attributesFilterList.push(
      { attributeName:"cc resistance",
        action:"increase",
        impact:"ally earth chakra nature",
        condition:"ninja is alive",
        value:10 }
    );
    let page:Pageable_ ={page:0,size:8};
    this.ninjasService.getNinjasPagination(page).subscribe(
      response =>{
        this.ninjas = response.ninjas;
        this.totalRecords = response.number;
        console.log(this.ninjas); 
      }
    )
  }
  filtro!:SearchFormationFilter;
  changeNinjas(filtro:SearchFormationFilter){
    this.filtro = filtro;
    this.tablaElements = "filtro.type";
    let page:Pageable_ ={page:1,size:8};
    this.ninjasService.getNinjasFilterAnd(filtro.filter,filtro.sorted,filtro.filtred
      ,page,filtro.awakening,filtro.or).subscribe(
      response =>{
        console.log(response)
        this.ninjas =response.content;
        this.totalRecords = response.totalElements;
      }
    )
    
    /*this.ninjas = ninjas;
    this.showNinja = ninjas[0];
    this.cdr.detectChanges();*/
  }

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'name', 'contains');
    console.log(elemento2);
  }

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

  loadComboSetsLazy(event: LazyLoadEvent) {
    this.loading = true;
    // La página actual se calcula a partir del primer registro que se necesita
    if(event.first && event.rows){
      console.log("combo no principio");
      let page:Pageable_ ={page:0,size:0};
      page.page = Math.floor(event.first / event.rows) +1;
      page.size = event.rows
      this.ninjasService.getNinjasFilterAnd(this.filtro.filter,this.filtro.sorted,this.filtro.filtred
      ,page,this.filtro.awakening,this.filtro.or).subscribe(
      response =>{
          console.log(response)
          this.ninjas =response.content;
          this.totalRecords = response.totalElements;
        }
      );
    }else{
      console.log("combo si principio");
      let page:Pageable_ ={page:0,size:8}; 
      this.ninjasService.getNinjasFilterAnd(this.filtro.filter,this.filtro.sorted,this.filtro.filtred
      ,page,this.filtro.awakening,this.filtro.or).subscribe(
      response =>{
          console.log(response)
          this.ninjas =response.content;
          this.totalRecords = response.number;
        }
      );
    }
    this.loading = false;
}

  loadSetsBaseLazy(event: LazyLoadEvent) {
    this.loading = true;
    // La página actual se calcula a partir del primer registro que se necesita
    console.log("aquisds")
    console.log(event);
    if(event.first && event.rows){
      //let page:Pageable = Math.floor(event.first / event.rows);
      console.log("base no principio");
      let page:Pageable_ ={page:0,size:0};
      page.page = Math.floor(event.first / event.rows);
      page.size = event.rows
      this.ninjasService.getNinjasPagination(page).subscribe(
        response =>{
          this.ninjas = response.ninjas;
          this.totalRecords = response.number;
          console.log(this.ninjas); 
        }
      )
      }else{
        console.log("base si principio");
        let page:Pageable_ ={page:0,size:8}; 
        this.ninjasService.getNinjasPagination(page).subscribe(
          response =>{
            this.ninjas = response.ninjas;
            this.totalRecords = response.number;
            console.log(this.ninjas); 
          }
        )
      }
      this.loading = false;
}

  ninjas:Ninja[] = [];
  ninjasToCompare:Ninja[] = [];
  rechargeNinjasList:boolean = true;
  rechargeCompareNinjasList:boolean = true;
  selectedNinja!:Ninja;
  selectedCompareNinja!:Ninja;
  showNinja:Ninja = Ninja.createNinja();
  listaBonus: ListaBonus[] = [];
  attributesFilterList:NinjaAttribute[]=[];
  @ViewChild(ShowNinjaComponent)
  hijoComponent!: ShowNinjaComponent;

  showNinjaStats(index:number,table:string,ninja:Ninja){
   /* if(table === 'setCompareList'){
      this.showNinja=this.ninjas[index];
    }else{
      this.showNinja=this.ninjas[index];
    }*/
    this.showNinja = JSON.parse(JSON.stringify(ninja));
    if(this.hijoComponent){
      this.hijoComponent.setShowNinja(this.showNinja);
      console.log("existo" +index);
      console.log(this.showNinja);
    }



  }

  addNinjaToCompare(rowIndex:number,ninja:Ninja){

  }

  deleteNinjaFromCompare(rowIndex:number){
    this.ninjasToCompare.splice(rowIndex,1);
  }

}
