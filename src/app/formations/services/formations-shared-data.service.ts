import { Injectable } from '@angular/core';
import { FormationElement } from '../interfaces/formations.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationsSharedDataService {

  constructor() { }

  _formationsToCompareList:FormationElement[]=[];
  _formationRight:BehaviorSubject<FormationElement> = new BehaviorSubject<FormationElement>(FormationElement.createFormation());
  _formationLeft:BehaviorSubject<FormationElement> = new BehaviorSubject<FormationElement>(FormationElement.createFormation());
  _showFormationRight:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _showFormationLeft:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /*_userNinjaToModify:BehaviorSubject<NinjaUserFormationDTO|undefined> = 
  new BehaviorSubject<NinjaUserFormationDTO|undefined>(undefined);*/


 /*get getUserNinjaToModify(){
    return this._userNinjaToModify.asObservable();
  }
  
  set setUserNinjaToModify(ninja:NinjaUserFormationDTO){
    this._userNinjaToModify.next(ninja);
  }*/

  get formationsToCompareList(){
    return this._formationsToCompareList;
  }

  set formationsToCompareList(formations:FormationElement[]){
    this._formationsToCompareList = formations;
  }

  get formationsToCompareListCopy(){
    return [...this._formationsToCompareList];
  }

  get getFormationLeft(){
    return this._formationLeft.asObservable();
  }
  get getFormationRight(){
    return this._formationRight.asObservable();
  }

  get getFormationLeftValue(){
    return this._formationLeft.value;
  }

  get getFormationRightValue(){
    return this._formationRight.value;
  }

  set setFormationRight(formation:FormationElement){
    this._formationRight.next(formation);
  }

  set setFormationLeft(formation:FormationElement){
    console.log(formation);
    this._formationLeft.next(formation);
  }

  get getShowFormationLeft(){
    return this._showFormationLeft.asObservable();
  }

  set setShowFormationLeft(value:boolean){
    this._showFormationLeft.next(value);
  }

  get getShowFormationRight(){
    return this._showFormationRight.asObservable();
  }

  set setShowFormationRight(value:boolean){
    this._showFormationRight.next(value);
  }
}
