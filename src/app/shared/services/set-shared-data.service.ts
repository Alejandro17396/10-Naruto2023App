import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { Set, UserSetDTOResponse } from 'src/app/sets/interfaces/set.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SetSharedDataService implements OnInit{

  constructor() { }

  ngOnInit(): void {
  }

  setsToCompareList:Set[]=[];
  _setRight:BehaviorSubject<Set> = new BehaviorSubject<Set>(Set.crearAuxSet());
  _setLeft:BehaviorSubject<Set> = new BehaviorSubject<Set>(Set.crearAuxSet());
  _showSetRight:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _showSetLeft:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _userSetToModify:BehaviorSubject<UserSetDTOResponse|undefined> = 
  new BehaviorSubject<UserSetDTOResponse|undefined>(undefined);


  get getUserSetToModify(){
    return this._userSetToModify.asObservable();
  }
  
  set setUserSetToModify(set:UserSetDTOResponse){
    this._userSetToModify.next(set);
  }

  get getLeft(){
    return this._setLeft.asObservable();
  }

  get _setsToCompareList(){
    return this.setsToCompareList;
  }

  set SetsToCompareList(sets:Set[]){
    this.setsToCompareList = sets;
  }

  get SetsToCompareListCopy(){
    return [...this.setsToCompareList];
  }

  get getRight(){
    return this._setRight.asObservable();
  }

  set setRight(set:Set){
    this._setRight.next(set);
  }

  set setLeft(set:Set){
    this._setLeft.next(set);
  }

  get getShowSetLeft(){
    return this._showSetLeft.asObservable();
  }

  set setShowSetLeft(value:boolean){
    this._showSetLeft.next(value);
  }

  get getShowSetRight(){
    return this._showSetRight.asObservable();
  }

  set setShowSetRight(value:boolean){
    this._showSetRight.next(value);
  }
}
