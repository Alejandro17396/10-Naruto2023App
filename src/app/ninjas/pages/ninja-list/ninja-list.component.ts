import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { Attribute, BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { Ninja ,Attribute as NinjaAttribute } from '../../interfaces/Ninja.interfaces';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { NinjasService } from '../../services/ninjas-service.service';
import { AccesoriesSharedDataService } from 'src/app/shared/services/accesories-shared-data.service';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';
import { ShowNinjaComponent } from '../show-ninja/show-ninja.component';

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
    this.ninjasService.getNinjas().subscribe(
      response =>{
        this.ninjas = response.ninjas;
        console.log(this.ninjas); 
      }
    )
  }
  changeNinjas(ninjas:Ninja[]){
    this.ninjas = ninjas;
    this.showNinja = ninjas[0];
    this.cdr.detectChanges();
  }

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'name', 'contains');
    console.log(elemento2);
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

  showNinjaStats(index:number,table:string){
    if(table === 'setCompareList'){
      this.showNinja=this.ninjas[index];
    }else{
      this.showNinja=this.ninjas[index];
    }
    if(this.hijoComponent){
      this.hijoComponent.setShowNinja(this.showNinja);
      console.log("existo" +index);
      console.log(this.showNinja);
    }



  }

  addNinjaToCompare(rowIndex:number){

  }

  deleteNinjaFromCompare(rowIndex:number){
    this.ninjasToCompare.splice(rowIndex,1);
  }

}
