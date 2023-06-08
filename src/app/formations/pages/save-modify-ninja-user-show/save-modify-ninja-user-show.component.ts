import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChakraNature, Ninja, NinjaUserFormationDTO, Skill } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { SaveElement } from 'src/app/shared/interfaces/attributes.interface,';
import { ActionToDo } from '../../interfaces/formations.interface';
import { Parte as ParteSet } from 'src/app/sets/interfaces/set.interfaces';
import { Parte as ParteAccesorio} from 'src/app/accesories/interfaces/accesories.interfaces';
@Component({
  selector: 'app-save-modify-ninja-user-show',
  templateUrl: './save-modify-ninja-user-show.component.html',
  styleUrls: ['./save-modify-ninja-user-show.component.css']
})
export class SaveModifyNinjaUserShowComponent {
  @Input() ninjaShow!:NinjaUserFormationDTO;
  @Input() canModify:boolean =false;
  @Input() formationView:boolean = false;
  ninjaUser!:NinjaUserFormationDTO;
  @Output() modifyNinja: EventEmitter<string>= new EventEmitter<string>();
  @Output() deleteNinja: EventEmitter<string>= new EventEmitter<string>();
  @Output() createNinja: EventEmitter<SaveElement>= new EventEmitter<SaveElement>();
  @Output() updateNinja: EventEmitter<SaveElement>= new EventEmitter<SaveElement>();
  @Output() deleteItemSetNinja: EventEmitter<ParteSet>= new EventEmitter<ParteSet>();
  @Output() deleteItemAccesoriesSetNinja: EventEmitter<ParteAccesorio>= new EventEmitter<ParteAccesorio>();
  @Output() deleteNinjaUser_: EventEmitter<Ninja>= new EventEmitter<Ninja>();


  skillText:string = "";
  titulo:string = "";
  visible:boolean = false;
  position:string = "left";
  @Input() accesorieSetName:string = "";
  @Input() setName:string  = "";
  @Input() ninjaName:string  = "";
  @Input() actionToDo!:ActionToDo;
  chakraNatures:ChakraNature [] = Object.values(ChakraNature);
  selectedChakraNature!:ChakraNature ;

  selectedTab:number = 0;

  public setTabTo(num:number){
    console.log("selected tab es "+num)
    this.selectedTab = num;
  }

  showDialog(skill:Skill){
    this.titulo = skill.nombre+" ("+skill.type+")";
    this.skillText = skill.skillText;
    this.visible = true;
  }

  ngOnInit(): void {
    console.log(this.accesorieSetName);
    console.log(this.ninjaShow);
  }

  deleteAccesorieSetItem(item:ParteAccesorio){
    this.deleteItemAccesoriesSetNinja.emit(item);
  }

  deleteSetItem(item:ParteSet){
    this.deleteItemSetNinja.emit(item);
  }

  deleteNinjaUser(ninja:Ninja){
    this.deleteNinjaUser_.emit(ninja);
  }

  modifySet(cadena:string){
    this.modifyNinja.emit(cadena);
  }

  deleteSet(cadena:string){
    this.deleteNinja.emit(cadena);
  }


  updateSet(cadena:string){
  
    if(this.selectedChakraNature){
      this.ninjaShow.chakraNature = this.selectedChakraNature;
    }else{
      this.ninjaShow.chakraNature = ChakraNature.Unactivated;
    }

    if(cadena === 'ninja'){
      this.updateNinja.emit({type:cadena,name:this.ninjaName});
    }

    if(cadena === 'set'){
      this.updateNinja.emit({type:cadena,name:this.setName});
    }

    if(cadena === 'accesories'){
      this.updateNinja.emit({type:cadena,name:this.accesorieSetName});
    }
  }

  createSet(cadena:string){

    if(this.selectedChakraNature){
      this.ninjaShow.chakraNature = this.selectedChakraNature;
    }else{
      this.ninjaShow.chakraNature = ChakraNature.Unactivated;
    }

    if(cadena === 'ninja'){
      console.log(this.ninjaName);
      this.createNinja.emit({type:cadena,name:this.ninjaName});
    }

    if(cadena === 'set'){
      this.createNinja.emit({type:cadena,name:this.setName});
    }

    if(cadena === 'accesories'){
      this.createNinja.emit({type:cadena,name:this.accesorieSetName});
    }
    
  }
}
