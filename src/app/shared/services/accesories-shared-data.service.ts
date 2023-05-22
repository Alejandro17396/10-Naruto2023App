import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccesorieSet, UserAccesorieSetDTO } from 'src/app/accesories/interfaces/accesories.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccesoriesSharedDataService {

  constructor() { }

  _accesoriesToCompareList:AccesorieSet[]=[];
  _setRight:BehaviorSubject<AccesorieSet> = new BehaviorSubject<AccesorieSet>(AccesorieSet.createSetAux());
  _setLeft:BehaviorSubject<AccesorieSet> = new BehaviorSubject<AccesorieSet>(AccesorieSet.createSetAux());
  _showSetRight:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _showSetLeft:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _userSetToModify:BehaviorSubject<UserAccesorieSetDTO|undefined> = 
  new BehaviorSubject<UserAccesorieSetDTO|undefined>(undefined);


  get getUserSetToModify(){
    return this._userSetToModify.asObservable();
  }
  
  set setUserSetToModify(set:UserAccesorieSetDTO){
    this._userSetToModify.next(set);
  }

 

  get accesoriesToCompareList(){
    return this._accesoriesToCompareList;
  }

  set accesoriesToCompareList(sets:AccesorieSet[]){
    this._accesoriesToCompareList = sets;
  }

  get accesoriesToCompareListCopy(){
    return [...this._accesoriesToCompareList];
  }

  get getLeft(){
    return this._setLeft.asObservable();
  }
  get getRight(){
    return this._setRight.asObservable();
  }

  set setRight(set:AccesorieSet){
    this._setRight.next(set);
  }

  set setLeft(set:AccesorieSet){
    this._setLeft.next(set);
  }

  get getShowSetLeft(){
    return this._showSetLeft.asObservable();
  }

  set setShowSetLeft(value:boolean){
    console.log("pongo el mostrar a " +value)
    this._showSetLeft.next(value);
  }

  get getShowSetRight(){
    return this._showSetRight.asObservable();
  }

  set setShowSetRight(value:boolean){
    console.log("pongo el mostrar a " +value)
    this._showSetRight.next(value);
  }
}
