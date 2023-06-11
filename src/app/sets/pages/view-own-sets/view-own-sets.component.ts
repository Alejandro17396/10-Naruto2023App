import { Component, OnInit, Input } from '@angular/core';
import { SetsService } from '../../services/sets.service';
import { Bonus, ListaBonus, Parte,Set,EffectEnum, TypeItemSet, ICreateUserSet, UserSetDTOResponse, ErrorResponse, DeleteUserSetDTOResponse } from '../../interfaces/set.interfaces';
import { ListaBonusUtils } from '../../utils/lista-bonus-utils';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SetSharedDataService } from 'src/app/shared/services/set-shared-data.service';
import { HttpResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompareSetsDialogComponent } from '../compare-sets-dialog/compare-sets-dialog.component';
@Component({
  selector: 'app-view-own-sets',
  templateUrl: './view-own-sets.component.html',
  styleUrls: ['./view-own-sets.component.css'],
  providers: [DialogService,MessageService,ConfirmationService]
})
export class ViewOwnSetsComponent implements OnInit{

  constructor(private setService:SetsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router,
    private setdataSharedService:SetSharedDataService,
    public dialogService: DialogService){}

  ngOnInit(): void {
    this.setService.getUserSets().subscribe(
      response =>{
        this.sets = response;
        this.sets2 = response;
        this.showSetItem(this.sets2[0],0);
        console.log(this.sets);
        console.log(this.sets2);
      } 
    );
  }

  sets:UserSetDTOResponse [] = [];
  sets2:Set [] = [];
  rechargeItemsList:boolean = true;
  selectedSet!:Set;
  set:Set = new Set();
  setUser!:UserSetDTOResponse;
  listaBonus:ListaBonus[] = [];
  indexSelectedSet:number = 0;
  setsToCompare:Set[] = [];
  ref!: DynamicDialogRef;

  filter(elemento:any,elemento2:any){
    if(elemento.target.value){
      elemento2.filter(elemento.target.value,'nombre', 'contains');
    }else{
      elemento2.filter(" ",'nombre', 'contains');
    }
  }

  showSetItem(set:Set,index:number){
    
    this.indexSelectedSet = index;
    this.set = set;
    let listaBonusL:ListaBonus [] = [];
    console.log(set);
    set.bonuses.forEach(
      bonus =>{
        let aux: ListaBonus [] = JSON.parse(JSON.stringify(bonus.listaBonus));
        listaBonusL.push(...aux);
      }
    )
    this.listaBonus = ListaBonusUtils.mergeListBonus(listaBonusL);
  }

  viewCompareList(){
    console.log(this.setsToCompare);
    const data = {
      sets: this.setsToCompare
    };
    this.ref = this.dialogService.open(CompareSetsDialogComponent, {
      header: 'Sets to compare',
      width: '80%',
      height:'80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });
  }

  deleteSet(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete set ' +this.set.nombre +'?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.setService.deleteUserSet(this.set.nombre).subscribe(
          (response:DeleteUserSetDTOResponse) =>{
            this.sets2.splice(this.indexSelectedSet,1);
            this.showSetItem(this.sets2[0],0);
            this.showSuccess(response.message);
            this.rechargeItemsList = false;
            setTimeout(() => {
              this.rechargeItemsList = true;
            }, 0);
          },
          (error:ErrorResponse) =>{
            this.showError(error.message);
          }
      );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              break;
          case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
      }
      }
  });
   
  }

  addToCompare(equipment:UserSetDTOResponse){
    console.log(equipment)
    let itemsName:string [] = [];
    /*this.equipment.partes.forEach( item => itemsName.push(item.nombre));*/
    equipment.partes.forEach(item => itemsName.push(item.nombre));
    let body : ICreateUserSet = {
      setName:equipment.nombre,
      equipment:itemsName
    }
    this.setService.transformUserSetToSet(body).subscribe(
      (response: HttpResponse<Set>) => {
        if(response.body){
          const exists = this.setsToCompare.
          some(set => set.nombre === response.body?.nombre);

          if(!exists){
            this.setsToCompare.push(response.body);
            this.showSuccess("Set " + response.body.nombre + " add to compare list");
          }else{
            this.showError("Set " + response.body.nombre + " is already in list");
          }
        }
      },
      (error) =>{
        console.log(error.error);
        this.showError(error.error.message);
      }
    );
  }

  modifySet(){
    console.log(this.sets[this.indexSelectedSet]);
    this.setdataSharedService.setUserSetToModify = this.sets[this.indexSelectedSet];
    this.route.navigate(['/sets/createOwnSets']);
  }

  showSuccess(text:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showError(text:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }

}
