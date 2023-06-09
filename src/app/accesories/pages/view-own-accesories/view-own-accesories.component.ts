import { Component } from '@angular/core';
import { ConfirmEventType, ConfirmationService,MessageService } from 'primeng/api';
import { AccesoriesService } from '../../services/accesories.service';
import { Router } from '@angular/router';
import { AccesoriesSharedDataService } from 'src/app/shared/services/accesories-shared-data.service';
import { AccesorieSet, DeleteUserAccesorieSetDTO, UserAccesorieSetDTO } from '../../interfaces/accesories.interfaces';
import { ErrorResponse, ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';

@Component({
  selector: 'app-view-own-accesories',
  templateUrl: './view-own-accesories.component.html',
  styleUrls: ['./view-own-accesories.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ViewOwnAccesoriesComponent {

  constructor(private accesoriesService:AccesoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router,
    private accesoriesDataSharedService:AccesoriesSharedDataService){}

  ngOnInit(): void {
    this.accesoriesService.getUserSets().subscribe(
      response =>{
        this.sets = response;
        this.sets2 = response;
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
    this.listaBonus = ListaBonusUtils.mergeListBonus(listaBonusL);
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
