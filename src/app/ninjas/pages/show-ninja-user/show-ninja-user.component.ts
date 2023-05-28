import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ninja, NinjaUserFormationDTO, Skill } from '../../interfaces/Ninja.interfaces';
import { Parte as ParteSet } from 'src/app/sets/interfaces/set.interfaces';
import { Parte as ParteAccesorio} from 'src/app/accesories/interfaces/accesories.interfaces';
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
  @Output() createNinja: EventEmitter<string>= new EventEmitter<string>();
  @Output() updateNinja: EventEmitter<string>= new EventEmitter<string>();
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
    this.updateNinja.emit(cadena);
  }

  createSet(cadena:string){
    this.createNinja.emit(cadena);
  }
}
