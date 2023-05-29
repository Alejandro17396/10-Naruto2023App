import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ninja, NinjaUserFormationDTO, Skill } from '../../interfaces/Ninja.interfaces';
import { Parte as ParteSet } from 'src/app/sets/interfaces/set.interfaces';
import { Parte as ParteAccesorio} from 'src/app/accesories/interfaces/accesories.interfaces';
import { SaveElement } from 'src/app/shared/interfaces/attributes.interface,';
//import { Parte as ParteEquipment} from 'src/app/sets/set.interfaces';
@Component({
  selector: 'show-ninja-user',
  templateUrl: './show-ninja-user.component.html',
  styleUrls: ['./show-ninja-user.component.css']
})
export class ShowNinjaUserComponent implements OnInit{

  @Input() ninjaShow!:NinjaUserFormationDTO;
  @Input() canModify:boolean =false;
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
    //this.ninjaShow.accesories.partes[0].nombre ="aaaaaaaaaaaaaaaaaaaauuuuuuuuuuuuu";
   // this.updateNinja.emit(cadena);
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
