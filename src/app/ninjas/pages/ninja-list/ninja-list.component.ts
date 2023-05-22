import { Component, OnInit } from '@angular/core';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { Ninja } from '../../interfaces/Ninja.interfaces';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { NinjasService } from '../../services/ninjas-service.service';
import { AccesoriesSharedDataService } from 'src/app/shared/services/accesories-shared-data.service';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';

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
    private messageService: MessageService){}

  ngOnInit(): void {
    this.ninjasService.getNinjas().subscribe(
      response =>{
        this.ninjas = response.ninjas;
        console.log(this.ninjas);
      }
    )
  }

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'nombre', 'contains');
    console.log(elemento2);
  }

  ninjas:Ninja[] = [];
  ninjasToCompare:Ninja[] = [];
  rechargeNinjasList:boolean = true;
  rechargeCompareNinjasList:boolean = true;
  selectedNinja!:Ninja;
  selectedCompareNinja!:Ninja;
  showNinja!:Ninja ;//= AccesorieSet.createSetAux();
  listaBonus: ListaBonus[] = [];
  attributesFilterList:BonusAttribute[]=[];

  showNinjaStats(index:number,table:string){
  }

  addNinjaToCompare(rowIndex:number){

  }

  deleteNinjaFromCompare(rowIndex:number){
    this.ninjasToCompare.splice(rowIndex,1);
  }

}
