import { Component, Input, OnInit } from '@angular/core';
import { AccesorieSet } from '../../interfaces/accesories.interfaces';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { AccesoriesService } from '../../services/accesories.service';
import { AccesoriesSharedDataService } from 'src/app/shared/services/accesories-shared-data.service';

@Component({
  selector: 'app-view-accesorie-set-differences',
  templateUrl: './view-accesorie-set-differences.component.html',
  styleUrls: ['./view-accesorie-set-differences.component.css']
})
export class ViewAccesorieSetDifferencesComponent implements OnInit{

  set:AccesorieSet =AccesorieSet.createSetAux();
  listaBonus: ListaBonus[]=[];
  listaBonus2: ListaBonus[]=[];
  setReady:boolean = false;
  @Input() setId!:number;

  constructor(private accesoriesService:AccesoriesService,
    private accesoriesDataSharedService:AccesoriesSharedDataService){}

  
  ngOnInit(): void {

    if(this.setId === 1){
      this.setLeft();
    }else{
      this.setRight();
    }
  }


  setLeft(){
    this.accesoriesDataSharedService.getLeft.subscribe(
        response =>{
          this.set = response;
          if(this.set.bonuses.length  === 5){
            this.listaBonus = [];
            this.set.bonuses.forEach(bonus =>{
              bonus.bonuses.forEach(bonusAtributo=>{
                this.listaBonus.push(bonusAtributo);
              });
            });
          }else{
            this.listaBonus = [];
            for(var i = 0; i<1;i++){
              let bonus= this.set.bonuses[i];
              bonus.bonuses.forEach(bonusAtributo=>{
                this.listaBonus.push(bonusAtributo);
              });
            }

            this.listaBonus2 = [];
            if(this.set.bonuses.length > 1){
              let bonus= this.set.bonuses[1];
              bonus.bonuses.forEach(bonusAtributo=>{
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

        }
    ); 
   
    this.accesoriesDataSharedService.getShowSetLeft.subscribe(
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
    this.accesoriesDataSharedService.getRight.subscribe(
        response =>{
          this.set = response;

          if(this.set.bonuses.length === 5){
            this.listaBonus = [];
            this.set.bonuses.forEach(bonus =>{
              bonus.bonuses.forEach(bonusAtributo=>{
                this.listaBonus.push(bonusAtributo);
              });
            });
          }else{
            this.listaBonus = [];
            for(var i = 0; i<1;i++){
              let bonus= this.set.bonuses[i]; 
              bonus.bonuses.forEach(bonusAtributo=>{
                this.listaBonus.push(bonusAtributo);
              });
            }

            this.listaBonus2 = [];
            if(this.set.bonuses.length > 1){
              let bonus= this.set.bonuses[1];
              bonus.bonuses.forEach(bonusAtributo=>{
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
        }
    );

    this.accesoriesDataSharedService.getShowSetRight.subscribe(
      response =>{
        this.setReady = response;
      }
    );

  }

}
