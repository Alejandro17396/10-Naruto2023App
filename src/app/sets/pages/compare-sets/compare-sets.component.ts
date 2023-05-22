import { Component, OnInit } from '@angular/core';
import { SetsService } from '../../services/sets.service';
import { ListaBonus, Set } from 'src/app/sets/interfaces/set.interfaces';
import { Product } from 'src/app/shared/interfaces/attributes.interface,';
import { SetSharedDataService } from 'src/app/shared/services/set-shared-data.service';
import { ViewSetDifferencesComponent } from '../view-set-differences/view-set-differences.component';
import { ListaBonusUtils } from '../../utils/lista-bonus-utils';

@Component({
  selector: 'app-compare-sets',
  templateUrl: './compare-sets.component.html',
  styleUrls: ['./compare-sets.component.css']
})
export class CompareSetsComponent implements OnInit {
  

  constructor(private setService: SetsService,
              private setDataSharedService:SetSharedDataService) {}

  sets:Set[]= [];

  responsiveOptions: any[] =[];

  setLeft!:Set;

  setRight!:Set;

  setCompareLeft!:Set;

  setCompareRight!:Set;

  showSetsToCompare(){
    console.log(this.sets);
  }
  ngOnInit() {
    this.sets = this.setDataSharedService._setsToCompareList;
    if(this.sets.length === 0){
      this.setService.getSets().subscribe(
        response => {
          this.sets=response.content;
          console.log(response.content);
        }
      );
    }
    
    this.sets = this.setDataSharedService._setsToCompareList;
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
      
      this.setDataSharedService.setShowSetLeft = false; // Establecer en false antes de navegar
      this.setDataSharedService.setShowSetRight = false; // Establecer en false antes de navegar
  }

  changeSetLeft(set:Set){
    if(this.setCompareRight){
      this.setCompareLeft = this.calculateDifferences(JSON.parse(JSON.stringify(set)),
      JSON.parse(JSON.stringify(this.setRight)));
      this.setCompareRight = this.calculateDifferences(JSON.parse(JSON.stringify(this.setRight)),
      JSON.parse(JSON.stringify(set)));
      this.setDataSharedService.setLeft = this.setCompareLeft;
      this.setLeft = JSON.parse(JSON.stringify(set));
      this.setDataSharedService.setRight = this.setCompareRight;
      this.setDataSharedService.setShowSetLeft= true;
    }else{
      this.setCompareLeft = JSON.parse(JSON.stringify(set));
      this.setLeft = JSON.parse(JSON.stringify(set));
      this.setDataSharedService.setLeft = this.setCompareLeft;
      this.setDataSharedService.setShowSetLeft= true;
    }
  }

  changeSetRight(set:Set){
    if(this.setCompareLeft){
      this.setCompareRight = this.calculateDifferences(JSON.parse(JSON.stringify(set)),
      JSON.parse(JSON.stringify(this.setLeft)));
      this.setCompareLeft = this.calculateDifferences(JSON.parse(JSON.stringify(this.setLeft)),
      JSON.parse(JSON.stringify(set)));
      this.setDataSharedService.setRight = this.setCompareRight;
      this.setRight = JSON.parse(JSON.stringify(set));
      this.setDataSharedService.setLeft = this.setCompareLeft;
      this.setDataSharedService.setShowSetRight= true;
    }else{
      this.setCompareRight = JSON.parse(JSON.stringify(set));
      this.setRight = JSON.parse(JSON.stringify(set));
      this.setDataSharedService.setRight = this.setCompareRight;
      this.setDataSharedService.setShowSetRight= true;
    }
  }


  calculateDifferences(setToCalculate: Set, setToCompare: Set): Set {
    const atributosSetToCalculate = new Map<string, number>();
    const atributosSetToCompare = new Map<string, number>();

    //mapeo los atributos del set a calcualr la diferencia
    setToCalculate.bonuses.forEach(bonus =>{
          bonus.listaBonus.forEach(bonusAtributo => {
            let value = atributosSetToCalculate.get(ListaBonusUtils.createKeyListaBonus(bonusAtributo));
            if(value){
              atributosSetToCalculate.set(ListaBonusUtils.createKeyListaBonus(bonusAtributo),
                value + bonusAtributo.valor);
            }else{
              atributosSetToCalculate.set(ListaBonusUtils.createKeyListaBonus(bonusAtributo),
                bonusAtributo.valor);
            }
          });
    });

    //mapeo los atributos del set con el que voy a comparar
    setToCompare.bonuses.forEach(bonus =>{
      bonus.listaBonus.forEach(bonusAtributo => {
        let value = atributosSetToCompare.get(ListaBonusUtils.createKeyListaBonus(bonusAtributo));
        if(value){
          atributosSetToCompare.set(ListaBonusUtils.createKeyListaBonus(bonusAtributo),
            value + bonusAtributo.valor);
        }else{
          atributosSetToCompare.set(ListaBonusUtils.createKeyListaBonus(bonusAtributo),
            bonusAtributo.valor);
        }
      });
    });

    const atributosDiferencia = new Map<string, number>();
    const atributosIguales = new Map<string, number>();

    for (const [key, value] of atributosSetToCalculate) { 
      const valorCompare = (atributosSetToCompare.get(key) || 0);
      

      const valorDiferencia = value - valorCompare;
      if(value == 0 || value == 1){
        atributosDiferencia.set(key, value);
        continue;
      }

      //si el valor es el mismo pongo el valor
      if(valorDiferencia == 0){
        atributosIguales.set(key, value);
        continue;
      }

      atributosDiferencia.set(key, valorDiferencia);
      
    } 
    
    for (const [key, value] of atributosSetToCompare) {
      if(!atributosSetToCalculate.get(key)){
        const val = (value==0)? 1:value;
        atributosDiferencia.set(key, -val);
      }
     
    }   

    let listaFinal:ListaBonus[] = [];

    for (const [key, value] of atributosDiferencia) {
     let aux:ListaBonus = JSON.parse(key);
     aux.valor = value;
     listaFinal.push(aux);
    } 
    
    let listaIguales:ListaBonus[] = [];

    for (const [key, value] of atributosIguales) {
     let aux:ListaBonus = JSON.parse(key);
     aux.valor = value;
     listaIguales.push(aux);
    } 



    setToCalculate.bonuses = [];
    setToCalculate.bonuses.push({nombre:'Final result',listaBonus:listaFinal});
    setToCalculate.bonuses.push({nombre:'Iguales',listaBonus:listaIguales});

    return setToCalculate;
  }


  /*export interface Bonus {
    nombre:     string;
    listaBonus: ListaBonus[];
  }*/
}



