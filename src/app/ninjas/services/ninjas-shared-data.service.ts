import { Injectable } from '@angular/core';
import { Ninja, NinjaUserFormationDTO } from '../interfaces/Ninja.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NinjasSharedDataService {

  constructor() { }

  _ninjasToCompareList:Ninja[]=[];
  _ninjaRight:BehaviorSubject<Ninja> = new BehaviorSubject<Ninja>(Ninja.createNinja());
  _ninjaLeft:BehaviorSubject<Ninja> = new BehaviorSubject<Ninja>(Ninja.createNinja());
  _showNinjaRight:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _showNinjaLeft:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _userNinjaToModify:BehaviorSubject<NinjaUserFormationDTO|undefined> = 
  new BehaviorSubject<NinjaUserFormationDTO|undefined>(undefined);
  _ninjaUserRight:BehaviorSubject<NinjaUserFormationDTO|undefined> =
  new BehaviorSubject<NinjaUserFormationDTO|undefined>(undefined);
  _ninjaUserLeft:BehaviorSubject<NinjaUserFormationDTO|undefined> = 
  new BehaviorSubject<NinjaUserFormationDTO|undefined>(undefined);
  _showNinjaUserRight:BehaviorSubject<boolean> = 
  new BehaviorSubject<boolean>(false);
  _showNinjaUserLeft:BehaviorSubject<boolean> = 
  new BehaviorSubject<boolean>(false);


  get getUserNinjaToModify(){
    return this._userNinjaToModify.asObservable();
  }
  
  set setUserNinjaToModify(ninja:NinjaUserFormationDTO){
    this._userNinjaToModify.next(ninja);
  }

  get ninjasToCompareList(){
    return this._ninjasToCompareList;
  }

  set ninjasToCompareList(ninjas:Ninja[]){
    this._ninjasToCompareList = ninjas;
  }

  get ninjasToCompareListCopy(){
    return [...this._ninjasToCompareList];
  }

  get getNinjaLeft(){
    return this._ninjaLeft.asObservable();
  }
  get getNinjaRight(){
    return this._ninjaRight.asObservable();
  }

  set setNinjaRight(ninja:Ninja){
    this._ninjaRight.next(ninja);
  }

  set setNinjaLeft(ninja:Ninja){
    console.log(ninja);
    this._ninjaLeft.next(ninja);
  }

  get getShowNinjaLeft(){
    return this._showNinjaLeft.asObservable();
  }

  set setShowNinjaLeft(value:boolean){
    this._showNinjaLeft.next(value);
  }

  get getShowNinjaRight(){
    return this._showNinjaRight.asObservable();
  }

  set setShowNinjaRight(value:boolean){
    this._showNinjaRight.next(value);
  }

  get getNinjaUserLeft(){
    return this._ninjaUserLeft.asObservable();
  }
  get getNinjaUserRight(){
    return this._ninjaUserRight.asObservable();
  }

  set setNinjaUserRight(ninja:NinjaUserFormationDTO|undefined){
    this._ninjaUserRight.next(ninja);
  }

  set setNinjaUserLeft(ninja:NinjaUserFormationDTO|undefined){
    console.log(ninja);
    this._ninjaUserLeft.next(ninja);
  }

  get getShowNinjaUserLeft(){
    return this._showNinjaUserLeft.asObservable();
  }

  set setShowNinjaUserLeft(value:boolean){
    this._showNinjaUserLeft.next(value);
  }

  get getShowNinjaUserRight(){
    return this._showNinjaUserRight.asObservable();
  }

  set setShowNinjaUserRight(value:boolean){
    this._showNinjaUserRight.next(value);
  }
}
