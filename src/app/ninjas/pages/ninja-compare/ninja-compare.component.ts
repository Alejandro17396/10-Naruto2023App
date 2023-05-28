import { Component } from '@angular/core';
import { AccesoriesSharedDataService } from 'src/app/shared/services/accesories-shared-data.service';
import { NinjasService } from '../../services/ninjas-service.service';
import { Ninja, Skill, SkillType,Attribute } from '../../interfaces/Ninja.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';

@Component({
  selector: 'app-ninja-compare',
  templateUrl: './ninja-compare.component.html',
  styleUrls: ['./ninja-compare.component.css']
})
export class NinjaCompareComponent {


  constructor(private ninjasService: NinjasService,
    private ninjasSharedDataService:NinjasSharedDataService) {}

    ngOnInit(): void {
    //this.ninjas = this.accesoriesSharedDataService._accesoriesToCompareList;
    if(this.ninjas.length === 0){
    this.ninjasService.getNinjas().subscribe(
    response =>{
    this.ninjas = response.ninjas;
    console.log(response.ninjas);
    }
    );
    this.ninjasSharedDataService.setShowNinjaLeft = false;
    this.ninjasSharedDataService.setShowNinjaRight = false;
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

    ninjas:Ninja[]= [];

    responsiveOptions: any[] =[];

    ninjaLeft!:Ninja;

    ninjaRight!:Ninja;

    ninjaCompareLeft!:Ninja;

    ninjaCompareRight!:Ninja;

    changeNinjaLeft(ninja:Ninja){
    if(this.ninjaCompareRight){
    console.log("si hay set der para comparar")
    this.ninjaCompareLeft = this.calculateDifferences(JSON.parse(JSON.stringify(ninja)),
    JSON.parse(JSON.stringify(this.ninjaRight)));
    this.ninjaCompareRight = this.calculateDifferences(JSON.parse(JSON.stringify(this.ninjaRight)),
    JSON.parse(JSON.stringify(ninja)));
    this.ninjasSharedDataService.setNinjaLeft = this.ninjaCompareLeft;
    this.ninjaLeft = JSON.parse(JSON.stringify(ninja));
    this.ninjasSharedDataService.setNinjaRight = this.ninjaCompareRight;
    this.ninjasSharedDataService.setShowNinjaLeft= true;
    }else{
    console.log("no hay set der para comparar")
    this.ninjaCompareLeft = JSON.parse(JSON.stringify(ninja));
    this.ninjaLeft = JSON.parse(JSON.stringify(ninja));
    this.ninjasSharedDataService.setNinjaLeft = this.ninjaCompareLeft;
    this.ninjasSharedDataService.setShowNinjaLeft= true;
    }

    }

    changeNinjaRight(ninja:Ninja){
    
    if(this.ninjaCompareLeft){
    console.log("si hay set izq para comparar")
    this.ninjaCompareRight = this.calculateDifferences(JSON.parse(JSON.stringify(ninja)),
    JSON.parse(JSON.stringify(this.ninjaLeft)));
    this.ninjaCompareLeft = this.calculateDifferences(JSON.parse(JSON.stringify(this.ninjaLeft)),
    JSON.parse(JSON.stringify(ninja)));
    this.ninjasSharedDataService.setNinjaRight = this.ninjaCompareRight;
    this.ninjaRight = JSON.parse(JSON.stringify(ninja));
    this.ninjasSharedDataService.setNinjaLeft = this.ninjaCompareLeft;
    this.ninjasSharedDataService.setShowNinjaRight= true;
    }else{
    //console.log("no hay set izq para comparar")
    this.ninjaCompareRight = JSON.parse(JSON.stringify(ninja));
    this.ninjaRight = JSON.parse(JSON.stringify(ninja));
    this.ninjasSharedDataService.setNinjaRight = this.ninjaCompareRight;
    this.ninjasSharedDataService.setShowNinjaRight= true;
    }

    }


    calculateDifferences(ninjaToCalculate: Ninja, ninjaToCompare: Ninja): Ninja {
      let ninjaAttributesTalentToCalculate:Map<string, Attribute> = new Map<string, Attribute>();
      let ninjaAttributesTalentToCompare:Map<string, Attribute> = new Map<string, Attribute>();
      let ninjaAttributesSkillToCalculate:Map<string, Attribute> = new Map<string, Attribute>();
      let ninjaAttributesSkillToCompare:Map<string, Attribute> = new Map<string, Attribute>();
      let ninjaAttributesNormalAttackToCalculate:Map<string, Attribute> = new Map<string, Attribute>();
      let ninjaAttributesNormalAttackToCompare:Map<string, Attribute> = new Map<string, Attribute>();
      ninjaToCalculate.skills.forEach(
        skill =>{
          if(skill.type == SkillType.Talent){
            ninjaAttributesTalentToCalculate = this.mapNinjaSkillAttributes(skill.attributes);
          }
          if(skill.type == SkillType.Skill){
            ninjaAttributesSkillToCalculate = this.mapNinjaSkillAttributes(skill.attributes);
          }
          if(skill.type == SkillType.NormalAttack){
            ninjaAttributesNormalAttackToCalculate = this.mapNinjaSkillAttributes(skill.attributes);
          }
        }
      )

      ninjaToCompare.skills.forEach(
        skill =>{
          if(skill.type == SkillType.Talent){
            ninjaAttributesTalentToCompare = this.mapNinjaSkillAttributes(skill.attributes);
          }
          if(skill.type == SkillType.Skill){
            ninjaAttributesSkillToCompare = this.mapNinjaSkillAttributes(skill.attributes);
          }
          if(skill.type == SkillType.NormalAttack){
            ninjaAttributesNormalAttackToCompare = this.mapNinjaSkillAttributes(skill.attributes);
          }
        }
      );

      let ninjaTalentDifferences: Attribute [] = this.calculateAttributesDifferences(ninjaAttributesTalentToCalculate,ninjaAttributesTalentToCompare);
      let ninjaSkillDifferences: Attribute [] = this.calculateAttributesDifferences(ninjaAttributesSkillToCalculate,ninjaAttributesSkillToCompare);
      let ninjaNormalAttackDifferences: Attribute [] = this.calculateAttributesDifferences(ninjaAttributesNormalAttackToCalculate,ninjaAttributesNormalAttackToCompare);
     
      ninjaToCalculate.skills.forEach(
        skill =>{
          if(skill.type == SkillType.Talent){
            skill.attributes = ninjaTalentDifferences;
          }

          if(skill.type == SkillType.Skill){
            skill.attributes = ninjaSkillDifferences;
          }

          if(skill.type == SkillType.NormalAttack){
            skill.attributes = ninjaNormalAttackDifferences;
          }
        }
      )
      return ninjaToCalculate;
    }

    calculateAttributesDifferences(ninjaAttributesTalentToCalculate: Map<string, Attribute>, ninjaAttributesTalentToCompare: Map<string, Attribute>): Attribute[] {
      
      let attributesDiff: Map<string, Attribute> = new Map<string, Attribute>();
      for (const [key, value] of ninjaAttributesTalentToCalculate) { 

        const valueCompare = ninjaAttributesTalentToCompare.get(key);

        if(valueCompare){
          const diffValue = value.value - valueCompare.value;
          if(diffValue === 0){
            value.color ='#FFFF00'
            attributesDiff.set(key,JSON.parse(JSON.stringify(value)));
            console.log("amarillo");
            continue;
          }
          let aux: Attribute = JSON.parse(JSON.stringify(value));
          aux.value = diffValue;
          if(diffValue>0){
            console.log("soy mayor que 0 mi val es " +aux.value);
            aux.color= "#00FF33";
            attributesDiff.set(key,aux);
          }else{
            console.log("soy menor que 0 mi val es " +aux.value);
            aux.color= "#FF0000";
            attributesDiff.set(key,aux); 
          }
          
        }else{
          let aux: Attribute = JSON.parse(JSON.stringify(value));
          aux.color= "#00FF33";
          attributesDiff.set(key,aux);
        }
      }

      for (const [key, value] of ninjaAttributesTalentToCompare) { 
        if(!ninjaAttributesTalentToCalculate.get(key)){
          const valueCopy:Attribute = JSON.parse(JSON.stringify(value));
          valueCopy.value = -valueCopy.value;
          valueCopy.color = "#FF0000";
          attributesDiff.set(key,valueCopy);
        }
      }
       
      let attributes : Attribute [] = Array.from(attributesDiff.values());          
      return attributes;
    }

    mapNinjaSkillAttributes(attributes:Attribute[] ): Map<string, Attribute> {
      let mapa:Map<string, Attribute> = new Map<string, Attribute>();

      attributes.forEach(
        attribute =>{
          let key = ListaBonusUtils.getKeyAttributeNotTime(attribute);
          let exists = mapa.get(key);
          if(exists){
            exists.value += attribute.value;
            mapa.set(key,exists);
          }else{
            mapa.set(key,JSON.parse(JSON.stringify(attribute)));
          }
        }
      );

      return mapa;
    }

}




