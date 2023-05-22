import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccesoriesService } from '../../services/accesories.service';
import { AccesorieSet, ICreateUserAccesorieSet, UserAccesorieSetDTO } from '../../interfaces/accesories.interfaces';
import { HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog-accesorie-set',
  templateUrl: './confirm-dialog-accesorie-set.component.html',
  styleUrls: ['./confirm-dialog-accesorie-set.component.css'],
  providers: [MessageService]
})
export class ConfirmDialogAccesorieSetComponent {

  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private accesoriesService:AccesoriesService) {}

  userSetName:string ="";
  saveSet:AccesorieSet = new AccesorieSet("",[],[]);
  warnMessage:boolean =false;

  ngOnInit(){
    this.saveSet = this.config.data.showSet;
  }

  showSuccess(message:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  reject(){
    this.ref.close();
  }

  accept(){
    if(this.userSetName && this.userSetName.length >6){
      let itemsName:string [] = [];
      this.saveSet.partes.forEach( item => {
          itemsName.push(item.nombre)
      });
      
      let body : ICreateUserAccesorieSet = {
        accesorieSetName:this.userSetName,
        accesories:itemsName
      }
      console.log(body);
      this.accesoriesService.createUserSet(body).subscribe(
        (response: HttpResponse<UserAccesorieSetDTO>) => {
          const statusCode = response.status; // Código de respuesta
          console.log(statusCode);
          this.showSuccess("Set "+this.userSetName +" saved succesfully");
          this.ref.close();
          // Resto del manejo de la respuesta
        },
        (error) =>{
          console.log(error.error);
          this.showError("Cant save set "+this.userSetName);
          this.ref.close();
        }
      );
    }else{
      this.warnMessage =true;
    }
  }

}
