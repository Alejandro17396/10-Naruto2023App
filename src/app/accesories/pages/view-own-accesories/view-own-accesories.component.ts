import { Component } from '@angular/core';
import { ConfirmEventType, ConfirmationService,MessageService } from 'primeng/api';
import { AccesoriesService } from '../../services/accesories.service';
import { Router } from '@angular/router';
import { AccesoriesSharedDataService } from 'src/app/shared/services/accesories-shared-data.service';
import { AccesorieSet, DeleteUserAccesorieSetDTO, ICreateUserAccesorieSet, UserAccesorieSetDTO } from '../../interfaces/accesories.interfaces';
import { ErrorResponse, ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { HttpResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompareAcesorieSetDialogComponent } from '../compare-acesorie-set-dialog/compare-acesorie-set-dialog.component';

@Component({
  selector: 'app-view-own-accesories',
  templateUrl: './view-own-accesories.component.html',
  styleUrls: ['./view-own-accesories.component.css'],
  providers: [MessageService,ConfirmationService,DialogService]
})
export class ViewOwnAccesoriesComponent {

  constructor(private accesoriesService:AccesoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router,
    private accesoriesDataSharedService:AccesoriesSharedDataService,
    public dialogService: DialogService){}

  ngOnInit(): void {
    this.accesoriesService.getUserSets().subscribe(
      response =>{
        this.sets = response;
        this.sets2 = response;
        console.log("bbbb")
        this.showSetItem(this.sets2[0],0);
        console.log(this.sets);
        console.log(this.sets2);
      } 
    );
  }

  sets:UserAccesorieSetDTO [] = [];
  sets2:AccesorieSet [] = [];
  rechargeItemsList:boolean = true;
  selectedSet!:AccesorieSet;
  set:AccesorieSet = new AccesorieSet("",[],[]);
  setUser!:UserAccesorieSetDTO;
  listaBonus:ListaBonus[] = [];
  indexSelectedSet:number = 0;
  accesorieSetToCompare:AccesorieSet [] = [];
  ref!: DynamicDialogRef;


  filter(elemento:any,elemento2:any){
    if(elemento.target.value){
      elemento2.filter(elemento.target.value,'nombre', 'contains');
    }else{
      elemento2.filter(" ",'nombre', 'contains');
    }
  }

  showSetItem(set:AccesorieSet,index:number){
    
    this.indexSelectedSet = index;
    this.set = set;
    let listaBonusL:ListaBonus [] = [];
    console.log(set);
    set.bonuses.forEach(
      bonus =>{
        let aux: ListaBonus [] = JSON.parse(JSON.stringify(bonus.bonuses));
        listaBonusL.push(...aux);
      }
    )
    console.log("aaaaa");
    console.log(listaBonusL);
    this.listaBonus = ListaBonusUtils.mergeListBonus(listaBonusL);
    console.log(this.listaBonus);
  }

  viewCompareList(){
    console.log(this.accesorieSetToCompare);

    const data = {
      accesorieSetToCompare: this.accesorieSetToCompare
    };
    this.ref = this.dialogService.open(CompareAcesorieSetDialogComponent, {
      header: 'Accesorie sets to compare',
      width: '80%',
      height:'80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });
  }

  /*.btn-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */

  addToCompare(accesorieSet:UserAccesorieSetDTO){
    console.log(accesorieSet)
    let itemsName:string [] = [];
    /*this.equipment.partes.forEach( item => itemsName.push(item.nombre));*/
    accesorieSet.partes.forEach(item => itemsName.push(item.nombre));
    let body : ICreateUserAccesorieSet = {
      accesorieSetName:accesorieSet.nombre,
      accesories:itemsName
    }
    this.accesoriesService.transformUserAccesorieSetToAccesorieSet(body).subscribe(
      (response: HttpResponse<AccesorieSet>) => {
        if(response.body){
          const exists = this.accesorieSetToCompare.
          some(set => set.nombre === response.body?.nombre);

          if(!exists){
            this.accesorieSetToCompare.push(response.body);
            this.showSuccess("Set " + response.body.nombre + " add to compare list");
          }else{
            this.showError("Set " + response.body.nombre + " is already in list");
          }
        }
      },
      (error:any) =>{
        console.log(error.error);
        this.showError(error.error.message);
      }
    );
  }

  deleteSet(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete set ' +this.set.nombre +'?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accesoriesService.deleteUserSet(this.set.nombre).subscribe(
          (response:DeleteUserAccesorieSetDTO) =>{
            this.sets2.splice(this.indexSelectedSet,1);
            this.showSetItem(this.sets2[0],0);
            this.showSuccess(response.message);
            this.rechargeItemsList = false;
            setTimeout(() => {
              this.rechargeItemsList = true;
            }, 0);
          },
          (error:DeleteUserAccesorieSetDTO) =>{
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

  modifySet(){
    console.log(this.sets[this.indexSelectedSet]);
    this.accesoriesDataSharedService.setUserSetToModify = this.sets[this.indexSelectedSet];
    this.route.navigate(['/accesories/createOwnAccesories']);
  }

  showSuccess(text:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showError(text:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }

}
