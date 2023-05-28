import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Ninja, Skill, SkillType,Attribute } from '../../interfaces/Ninja.interfaces';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { NinjasService } from '../../services/ninjas-service.service';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';

@Component({
  selector: 'view-ninja-differences',
  templateUrl: './view-ninja-differences.component.html',
  styleUrls: ['./view-ninja-differences.component.css']
})
export class ViewNinjaDifferencesComponent implements OnInit{

  ninja:Ninja = Ninja.createNinja();
  listaBonus: Attribute[]=[];
  listaBonus2: ListaBonus[]=[];
  ninjaReady:boolean = false;
  visible:boolean = false;
  skillText: string = "";
  titulo:string = "";
  position:string ="";
  @Input() ninjaPosition!:number;

  constructor(private ninjasService:NinjasService,
    private ninjasDataSharedService:NinjasSharedDataService,
    private cdr: ChangeDetectorRef){}

  
  ngOnInit(): void {
    if(this.ninjaPosition === 1){
      this.setLeft();
      this.position = 'left';
    }else{
      this.setRight();
      this.position = 'right';
    }
  }

  showDialog(skill:Skill){
    this.titulo = skill.nombre+" ("+skill.type+")";
    this.skillText = skill.skillText;
    this.visible = true;
  }

  setLeft(){
    this.ninjasDataSharedService.getNinjaLeft.subscribe(
      response =>{
        this.ninja = response;
      }
    );
    this.ninjasDataSharedService.getShowNinjaLeft.subscribe(
      response =>{
        this.ninjaReady = response;
      }
    );
    this.cdr.detectChanges();
  }

  listaBonusTalent :ListaBonus[] = [];
  setAttributesTalent(skill:Skill){
    let aux:Attribute [] = ListaBonusUtils.MergeNinjaTalentAttributes(skill.attributes);
    console.log(aux.length);
    skill.attributes.forEach(
      attribute =>{ 
        this.listaBonus.push(attribute);
      }
    );
  }

  setRight(){
    this.ninjasDataSharedService.getNinjaRight.subscribe(
      response =>{
        this.ninja = response;
      }
    );
    this.ninjasDataSharedService.getShowNinjaRight.subscribe(
      response =>{
        this.ninjaReady = response;
      }
    );
    this.cdr.detectChanges();
  }
}
