import { Component, Input, OnInit } from '@angular/core';
import { SetsService } from '../../services/sets.service';
import { ListaBonus, Set } from 'src/app/sets/interfaces/set.interfaces';
import { SetSharedDataService } from 'src/app/shared/services/set-shared-data.service';

@Component({
  selector: 'app-view-set-differences',
  templateUrl: './view-set-differences.component.html',
  styleUrls: ['./view-set-differences.component.css']
})
export class ViewSetDifferencesComponent implements OnInit{

  set:Set =Set.crearAuxSet();
  listaBonus: ListaBonus[]=[];
  listaBonus2: ListaBonus[]=[];
  setReady:boolean = false;
  @Input() setId!:number;


  constructor(private setService:SetsService,
              private setDataSharedService:SetSharedDataService){}

  ngOnInit(): void {
    if(this.setId === 1){
      this.setLeft();
    }else{
      this.setRight();
    }
  }

  setLeft(){
    this.setDataSharedService.getLeft.subscribe(
        response =>{
          this.set = response;
          if(this.set.bonuses.length  === 3){
            this.listaBonus = [];
            this.set.bonuses.forEach(bonus =>{
              bonus.listaBonus.forEach(bonusAtributo=>{
                this.listaBonus.push(bonusAtributo);
              });
            });
          }else{
            this.listaBonus = [];
            for(var i = 0; i<1;i++){
              let bonus= this.set.bonuses[i];
              bonus.listaBonus.forEach(bonusAtributo=>{
                this.listaBonus.push(bonusAtributo);
              });
            }

            this.listaBonus2 = [];
            if(this.set.bonuses.length > 1){
              let bonus= this.set.bonuses[1];
              bonus.listaBonus.forEach(bonusAtributo=>{
                this.listaBonus2.push(bonusAtributo);
              });
            }
          }
          
      
          this.listaBonus.sort(function(a, b) {
            if (a.nombreAtributo.length < b.nombreAtributo.length) {
              return -1;
            }
            if (a.nombreAtributo.length > b.nombreAtributo.length) {
              return 1;
            }
            return 0;
          });

          this.listaBonus2.sort(function(a, b) {
            if (a.nombreAtributo.length < b.nombreAtributo.length) {
              return -1;
            }
            if (a.nombreAtributo.length > b.nombreAtributo.length) {
              return 1;
            }
            return 0;
          });
          /*this.listaBonus = [];
          this.set.bonuses.forEach(bonus =>{
            bonus.listaBonus.forEach(bonusAtributo=>{
              this.listaBonus.push(bonusAtributo);
            });
          });

          this.listaBonus.sort(function(a, b) {
            if (a.nombreAtributo.length < b.nombreAtributo.length) {
              return -1;
            }
            if (a.nombreAtributo.length > b.nombreAtributo.length) {
              return 1;
            }
            return 0;
          });*/

        }
    ); 
   
    this.setDataSharedService.getShowSetLeft.subscribe(
      response =>{
        this.setReady = response;
      }
    );

  }


  ver(){
    console.log(this.listaBonus2);
    console.log(this.listaBonus);
  }

  setRight(){
    this.setDataSharedService.getRight.subscribe(
        response =>{
          this.set = response;

          if(this.set.bonuses.length === 3){
            this.listaBonus = [];
            this.set.bonuses.forEach(bonus =>{
              bonus.listaBonus.forEach(bonusAtributo=>{
                this.listaBonus.push(bonusAtributo);
              });
            });
          }else{
            this.listaBonus = [];
            for(var i = 0; i<1;i++){
              let bonus= this.set.bonuses[i];
              bonus.listaBonus.forEach(bonusAtributo=>{
                this.listaBonus.push(bonusAtributo);
              });
            }

            this.listaBonus2 = [];
            if(this.set.bonuses.length > 1){
              let bonus= this.set.bonuses[1];
              bonus.listaBonus.forEach(bonusAtributo=>{
                this.listaBonus2.push(bonusAtributo);
              });
            }
          }

         /* this.listaBonus = [];
          for(var i = 0; i<1;i++){
            let bonus= this.set.bonuses[i];
            bonus.listaBonus.forEach(bonusAtributo=>{
              this.listaBonus.push(bonusAtributo);
            });
          }

          this.listaBonus2 = [];
          if(this.set.bonuses.length > 1){
            let bonus= this.set.bonuses[1];
            bonus.listaBonus.forEach(bonusAtributo=>{
              this.listaBonus2.push(bonusAtributo);
            });
          }
          /*this.set.bonuses.forEach(bonus =>{
            bonus.listaBonus.forEach(bonusAtributo=>{
              this.listaBonus.push(bonusAtributo);
            });
          });*/
      
          this.listaBonus.sort(function(a, b) {
            if (a.nombreAtributo.length < b.nombreAtributo.length) {
              return -1;
            }
            if (a.nombreAtributo.length > b.nombreAtributo.length) {
              return 1;
            }
            return 0;
          });

          this.listaBonus2.sort(function(a, b) {
            if (a.nombreAtributo.length < b.nombreAtributo.length) {
              return -1;
            }
            if (a.nombreAtributo.length > b.nombreAtributo.length) {
              return 1;
            }
            return 0;
          });
        }
    );

    this.setDataSharedService.getShowSetRight.subscribe(
      response =>{
        this.setReady = response;
      }
    );

  }


}
