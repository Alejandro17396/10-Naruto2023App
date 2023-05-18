import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SetsService } from '../../services/sets.service';
import { Filters,ICreateUserSet,Set, UserSetDTOResponse } from '../../interfaces/set.interfaces';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-dialog-set',
  templateUrl: './confirm-dialog-set.component.html',
  styleUrls: ['./confirm-dialog-set.component.css']
})
export class ConfirmDialogSetComponent implements OnInit{


  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private setService:SetsService) {}

  ngOnInit(): void {
    this.saveSet = this.config.data.showSet;
  }

  userSetName:string ="";
  saveSet:Set = new Set();
  warnMessage:boolean =false;
  reject(){
    this.ref.close();
  }

  accept(){
    if(this.userSetName && this.userSetName.length >6){
      let itemsName:string [] = [];
      this.saveSet.partes.forEach( item => {
        if(item.nombre.includes("scroll") || item.nombre.includes("shuriken")){
          
        }else{
          itemsName.push(item.nombre)
        }
        
      });
      
      let body : ICreateUserSet = {
        setName:this.userSetName,
        equipment:itemsName
      }
      this.setService.createUserSet(body).subscribe(
        /*response => {
          console.log(response.status);
        }*/
        (response: HttpResponse<UserSetDTOResponse>) => {
          const statusCode = response.status; // Código de respuesta
          console.log(statusCode);
          this.ref.close();
          // Resto del manejo de la respuesta
        },
        (error) =>{
          console.log(error.error);
          this.ref.close();
        }
      );
    }else{
      this.warnMessage =true;
    }
  }
}
