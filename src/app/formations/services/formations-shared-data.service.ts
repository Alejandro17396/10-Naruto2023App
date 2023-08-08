import { Injectable } from '@angular/core';
import { FormationElement, UserFormationDTO } from '../interfaces/formations.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationsSharedDataService {

  constructor() { }

  private _formationsToCompareList: BehaviorSubject<FormationElement[]> = new BehaviorSubject<FormationElement[]>([]);

  get getFormationsToCompareList(): Observable<FormationElement[] > {
    return this._formationsToCompareList.asObservable();
  }
  
  set setFormationsToCompareList(formations: FormationElement[] ) {
    this._formationsToCompareList.next(formations);
  }
  
  

  _formationRight:BehaviorSubject<FormationElement|undefined> = 
  new BehaviorSubject<FormationElement|undefined>(undefined);

  _formationLeft:BehaviorSubject<FormationElement|undefined> = 
  new BehaviorSubject<FormationElement|undefined>(undefined); //FormationElement.createFormation()

  _showFormationRight:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _showFormationLeft:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  _userFormationToModify:BehaviorSubject<UserFormationDTO|undefined> = 
  new BehaviorSubject<UserFormationDTO|undefined>(undefined);


  get getUserFormationToModify(){
    return this._userFormationToModify.asObservable();
  }
  
  set setUserFormationToModify(ninja:UserFormationDTO){
    this._userFormationToModify.next(ninja);
  }

  /*get formationsToCompareListCopy(){
    return [...this._formationsToCompareList];
  }*/

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
