import { Component, OnInit } from '@angular/core';
import { AccesoriesService } from '../../services/accesories.service';
import { AccesoriesSharedDataService } from '../../../shared/services/accesories-shared-data.service';
import { AccesorieSet, Tipo } from '../../interfaces/accesories.interfaces';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';

@Component({
  selector: 'app-compare-accesories',
  templateUrl: './compare-accesories.component.html',
  styleUrls: ['./compare-accesories.component.css']
})
export class CompareAccesoriesComponent implements OnInit{
  
  constructor(private accesoriesService: AccesoriesService,
              private accesoriesSharedDataService:AccesoriesSharedDataService) {}
  
  ngOnInit(): void {
    this.accesories = this.accesoriesSharedDataService._accesoriesToCompareList;
    if(this.accesories.length === 0){
      this.accesoriesService.getAccesories().subscribe(
        response =>{
          this.accesories = response.content;
          console.log(response.content);
        }
      );
      this.accesoriesSharedDataService.setShowSetLeft = false;
      this.accesoriesSharedDataService.setShowSetRight = false;
    }

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
  }

  accesories:AccesorieSet[]= [];

  responsiveOptions: any[] =[];

  setLeft!:AccesorieSet;

  setRight!:AccesorieSet;

  setCompareLeft!:AccesorieSet;

  setCompareRight!:AccesorieSet;

  changeSetLeft(accesorieSet2:AccesorieSet){
    let accesorieSet:AccesorieSet = ListaBonusUtils.mergeBonusesAccesorieSet(JSON.parse(JSON.stringify(accesorieSet2)));
    console.log(accesorieSet)
    console.log(accesorieSet2)
    if(this.setCompareRight){
      this.setCompareLeft = this.calculateDifferences(JSON.parse(JSON.stringify(accesorieSet)),
      JSON.parse(JSON.stringify(this.setRight)));
      this.setCompareRight = this.calculateDifferences(JSON.parse(JSON.stringify(this.setRight)),
      JSON.parse(JSON.stringify(accesorieSet)));
      this.accesoriesSharedDataService.setLeft = this.setCompareLeft;
      this.setLeft = JSON.parse(JSON.stringify(accesorieSet));
      this.accesoriesSharedDataService.setRight = this.setCompareRight;
      this.accesoriesSharedDataService.setShowSetLeft= true;
    }else{
      this.setCompareLeft = JSON.parse(JSON.stringify(accesorieSet));
      this.setLeft = JSON.parse(JSON.stringify(accesorieSet));
      this.accesoriesSharedDataService.setLeft = this.setCompareLeft;
      this.accesoriesSharedDataService.setShowSetLeft= true;
    }

  }

  changeSetRight(accesorieSet2:AccesorieSet){
    let accesorieSet:AccesorieSet = ListaBonusUtils.mergeBonusesAccesorieSet(JSON.parse(JSON.stringify(accesorieSet2)));
    console.log(accesorieSet)
    console.log(accesorieSet2)
    if(this.setCompareLeft){
      this.setCompareRight = this.calculateDifferences(JSON.parse(JSON.stringify(accesorieSet)),
      JSON.parse(JSON.stringify(this.setLeft)));
      this.setCompareLeft = this.calculateDifferences(JSON.parse(JSON.stringify(this.setLeft)),
      JSON.parse(JSON.stringify(accesorieSet)));
      this.accesoriesSharedDataService.setRight = this.setCompareRight;
      this.setRight = JSON.parse(JSON.stringify(accesorieSet));
      this.accesoriesSharedDataService.setLeft = this.setCompareLeft;
      this.accesoriesSharedDataService.setShowSetRight= true;
    }else{
      this.setCompareRight = JSON.parse(JSON.stringify(accesorieSet));
      this.setRight = JSON.parse(JSON.stringify(accesorieSet));
      this.accesoriesSharedDataService.setRight = this.setCompareRight;
      this.accesoriesSharedDataService.setShowSetRight= true;
    }

  }


  calculateDifferences(setToCalculate: AccesorieSet, setToCompare: AccesorieSet): AccesorieSet {
    const atributosSetToCalculate = new Map<string, number>();
    const atributosSetToCompare = new Map<string, number>();

    //mapeo los atributos del set a calcualr la diferencia
    setToCalculate.bonuses.forEach(bonus =>{
          bonus.bonuses.forEach(bonusAtributo => {
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
      bonus.bonuses.forEach(bonusAtributo => {
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
    setToCalculate.bonuses.push({tipo:Tipo.Agility,bonuses:listaFinal});
    setToCalculate.bonuses.push({tipo:Tipo.Agility,bonuses:listaIguales});

    return setToCalculate;
  }

}
