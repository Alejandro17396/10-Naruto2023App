import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Attribute, NinjaUserFormationDTO, Skill } from '../../interfaces/Ninja.interfaces';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { NinjasService } from '../../services/ninjas-service.service';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';

@Component({
  selector: 'view-ninja-user-differences',
  templateUrl: './view-ninja-user-differences.component.html',
  styleUrls: ['./view-ninja-user-differences.component.css']
})
export class ViewNinjaUserDifferencesComponent implements OnInit{
  
  ngOnInit(): void {
    console.log("puto")
    if(this.ninjaPosition === 1){
      this.setLeft();
      this.position = 'left';
    }else{
      this.setRight();
      this.position = 'right';
    }
  }
  ninja:NinjaUserFormationDTO = new NinjaUserFormationDTO();
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

  setLeft(){
    this.ninjasDataSharedService.getNinjaUserLeft.subscribe(
      response =>{
        if(response)
        this.ninja = response;
      }
    );
    this.ninjasDataSharedService.getShowNinjaUserLeft.subscribe(
      response =>{
        this.ninjaReady = response;
      }
    );
    this.cdr.detectChanges();
  }

  listaBonusTalent :ListaBonus[] = [];
  setAttributesTalent(skill:Skill){
   /* let aux:Attribute [] = ListaBonusUtils.MergeNinjaTalentAttributes(skill.attributes);
    console.log(aux.length);
    skill.attributes.forEach(
      attribute =>{ 
        this.listaBonus.push(attribute);
      }
    );*/
  }

  showDialog(skill:Skill){
    console.log("`pidxkl")
    this.titulo = skill.nombre+" ("+skill.type+")";
    this.skillText = skill.skillText;
    this.visible = true;
  }

  setRight(){
    this.ninjasDataSharedService.getNinjaUserRight.subscribe(
      response =>{
        if(response)
        this.ninja = response;
      }
    );
    this.ninjasDataSharedService.getShowNinjaUserRight.subscribe(
      response =>{
        this.ninjaReady = response;
      }
    );
    this.cdr.detectChanges();
  }
}
