import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Parte as ParteAccesorio} from 'src/app/accesories/interfaces/accesories.interfaces';
import { ChakraNature, NinjaUserFormationDTO } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { Parte } from 'src/app/sets/interfaces/set.interfaces';

@Component({
  selector: 'app-show-ninja-user-formation-panel',
  templateUrl: './show-ninja-user-formation-panel.component.html',
  styleUrls: ['./show-ninja-user-formation-panel.component.css']
})
export class ShowNinjaUserFormationPanelComponent implements OnInit{
  
  ngOnInit(): void {
    this.ninjaShow = this.config.data.ninjaShow;
    this.canModify = this.config.data.canModify;
  }

  constructor(public config: DynamicDialogConfig){}

  @Input() ninjaShow!:NinjaUserFormationDTO;
  @Input() canModify:boolean = false;
  accesorieSetName:string = "";
  setName:string = "";
  ninjaName:string = "";
  chakraNatures:ChakraNature [] = Object.values(ChakraNature);
  selectedChakraNature!:ChakraNature ;
  selectedTab:number = 0;
  deleteAccesorieSetItem(item:ParteAccesorio){

  }

  deleteSetItem(item:Parte){

  }

  updateSet(cadena:string){

  }

  createSet(cadena:string){

  }

  modify(type:string){

  }

  delete(type:string){
    
  }

  metodo(){}

}
