import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogConfirmation } from 'src/app/shared/interfaces/attributes.interface,';


@Component({
  selector: 'app-delete-equipment',
  templateUrl: './delete-equipment.component.html',
  styleUrls: ['./delete-equipment.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class DeleteEquipmentComponent implements OnInit{

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private confirmationService: ConfirmationService,) {}

  ngOnInit(): void {
    this.wrap = this.config.data.wrap;
    this.wrap.opcion = "reject";
    this.message = this.wrap.message;
  }
    wrap!:DialogConfirmation ;
    message:string ="";
    opcion:string = "";

  accept(){
    this.wrap.opcion = "accept";
    this.ref.close();
  }

  reject(){
    this.wrap.opcion = "reject";
    this.ref.close();
  }
}
