import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Parte as ParteAccesorio} from 'src/app/accesories/interfaces/accesories.interfaces';
import { ChakraNature, ICreateUserNinja, NinjaUserFormationDTO } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { NinjasService } from 'src/app/ninjas/services/ninjas-service.service';
import { NinjasSharedDataService } from 'src/app/ninjas/services/ninjas-shared-data.service';
import { NinjaUtils } from 'src/app/ninjas/utils/NinjaUtils';
import { Parte } from 'src/app/sets/interfaces/set.interfaces';

@Component({
  selector: 'app-show-ninja-user-formation-panel',
  templateUrl: './show-ninja-user-formation-panel.component.html',
  styleUrls: ['./show-ninja-user-formation-panel.component.css'],

})
export class ShowNinjaUserFormationPanelComponent implements OnInit{
  
  ngOnInit(): void {
    this.ninjaShow = this.config.data.ninjaShow;
    console.log(this.ninjaShow)
    console.log("holasdsdsd");
    this.calculateNinjaBonuses();

    this.canModify = this.config.data.canModify;
  }

  /*export interface ICreateUserNinja{
    id?:            number;
    name:           string;
    ninja:          string | undefined;
    skilltype?:     SkillType;
    chakraNature?:  string;
    accesories?:     ICreateUserAccesorieSet |undefined;
    set?:            ICreateUserSet |undefined;
}*/

  calculateNinjaBonuses(){
    let body : ICreateUserNinja = NinjaUtils.NinjaUserDTOToICreateNinjaUser(this.ninjaShow);
      this.ninjasService.calculateNinjaUserFinalBonuses(body).subscribe(
        response =>{
          this.ninjaShow.selfBonusWithItems = response.selfBonusWithItems;
        }
    );
    
  }

  constructor(public config: DynamicDialogConfig,
              private ninjasService:NinjasService,
              private route:Router,
              public ref: DynamicDialogRef,
              private ninjasDataSharedService:NinjasSharedDataService){}

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
    this.ninjasDataSharedService.setUserNinjaToModify = this.ninjaShow;
    this.route.navigate(['/ninjas/createOwnNinjas']);
    this.ref.close();
    
  }

  delete(type:string){
    
  }

  metodo(){}

}
