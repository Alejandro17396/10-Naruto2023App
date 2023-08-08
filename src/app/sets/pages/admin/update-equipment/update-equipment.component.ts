import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SetsService } from 'src/app/sets/services/sets.service';
import { SetSharedDataService } from 'src/app/shared/services/set-shared-data.service';
import { Bonus, DeleteUserSetDTOResponse, EffectEnum, ErrorResponse, Filters, ListaBonus, SaveEquipment, Set } from 'src/app/sets/interfaces/set.interfaces';
import { Attribute, Ninja } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { HttpResponse } from '@angular/common/http';
import { AdminFilterBonusAttributePanelComponent } from '../../admin-filter-bonus-attribute-panel/admin-filter-bonus-attribute-panel.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteEquipmentComponent } from '../delete-equipment/delete-equipment.component';
import { DialogConfirmation } from 'src/app/shared/interfaces/attributes.interface,';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class UpdateEquipmentComponent implements OnInit  {


  ngOnInit() {
    this.sets = this.setDataSharedService._setsToCompareList;
    if(this.sets.length === 0){
      this.setsService.getSets().subscribe(
        response => {
          this.sets=response.content;
          console.log(response.content);
          console.log(this.sets[this.sets.length-1])
          //this.changeSetLeft(this.sets[this.sets.length-1]);
        }
      );
    }
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
      }
  ];
  }

  constructor(private setsService: SetsService,
      private setDataSharedService:SetSharedDataService,
      public dialogService: DialogService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private cdr: ChangeDetectorRef,
      private sanitizer: DomSanitizer) {}

  deleteEquipment(set:Set){
      let opcion:DialogConfirmation = {message:"Are you sure you want to delete equipment " + set.nombre, opcion:""};
      const data = {
        wrap:opcion
      };
      this.ref = this.dialogService.open(DeleteEquipmentComponent, {
        header: 'Confirmation',
        width: '50%',
        height:'20%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: data
      });

      this.ref.onClose.subscribe(()=>{
        console.log(opcion);
        if(opcion.opcion === "accept" && set.nombre){
          this.setsService.deleteEquipment(set.nombre).subscribe(
            (response:HttpResponse<DeleteUserSetDTOResponse>) =>{
            //eliminar el set de la lista sets
            const index = this.sets.findIndex(item => item.nombre === set.nombre);
            if (index !== -1) {
              this.sets.splice(index, 1);
            }
          },
          (error:ErrorResponse) =>{
            this.showError(error.message);
          }
          )
        }
      })         
    }

    showEquipment(set:Set){
      this.updateSet = true;
      console.log(set);
      for(var i = 0; i <set.partes.length;i++){
        if(set.partes[i].image != null){
          this.partes[i].oldFile = set.partes[i].image;
          this.partes[i].file = set.partes[i].image;
          this.partes[i].imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + set.partes[i].image!);
        }else{
          this.partes[i].imageUrl = null;
        }
        this.partes[i].name = set.partes[i].nombre;
        this.partes[i].value = set.partes[i].valor;
        this.partes[i].stat = set.partes[i].atributo.nombre;
      }
      
      for(var i = 0; i<set.bonuses.length; i++){
        this.listaBonus[i]= [];
        for(var j = 0; j<set.bonuses[i].listaBonus.length; j++){
          this.listaBonus[i].push(
            ListaBonusUtils.ListaBonusToAttributeNinja(set.bonuses[i].listaBonus[j]));
        }
      }
      this.set = set;

    }

    showFilterPanel(index:number){
      
      const data = {
        attributesFilterList: this.listaBonus[index],
        filters: this.filter,
        setFilter :this.setFilter
      };
      this.ref = this.dialogService.open(AdminFilterBonusAttributePanelComponent, {
        header: 'Set filter conditions',
        width: '80%',
        height:'80%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: data
      });
      this.ref.onClose.subscribe(()=>{
        console.log(this.attributesFilterList);
        this.cdr.detectChanges();
      })
    }
    saveEquipment(){
      let attributes:string[] = [];
      this.set.partes = [];
      this.set.bonuses = [];
      this.partes.forEach(part =>{
        if(part.file){
          this.set.partes.push({
            nombre:part.name,
            atributo:{nombre:part.stat},
            valor:part.value,
            setName:this.set.nombre,
            image:part.file
          });
        }else{
          this.set.partes.push({
            nombre:part.name,
            atributo:{nombre:part.stat},
            valor:part.value,
            setName:this.set.nombre,
            image:part.oldFile
          });
        }
        if(part.stat)
        attributes.push(part.stat);
      });
      for(var i = 0; i<3;i++){
        let bonus:Bonus;
        if(i===0){
          bonus = {nombre:EffectEnum.Two,listaBonus:[]};
        }else if(i === 1){
          bonus = {nombre:EffectEnum.Four,listaBonus:[]};
        }else{
          bonus = {nombre:EffectEnum.Six,listaBonus:[]};
        }
        for(var j = 0; j<3;j++){
          if(this.listaBonus[i][j]){
            bonus.listaBonus.push(ListaBonusUtils.AttributeNinjaToListaBonus(this.listaBonus[i][j]));
            attributes.push(this.listaBonus[i][j].attributeName);
          }
         }
        this.set.bonuses.push(bonus);
      }

      let body:SaveEquipment = {set:this.set, attributes:attributes};
      const formData = new FormData();
  
      body.set.partes.forEach(part =>{
        part.image = undefined;
      });

      formData.append('body', JSON.stringify(body));
      for (let i = 0; i < this.partes.length; i++) {
        const file = this.partes[i].file;
        if(file && file.name){
          let newFile = new File([this.partes[i].file], this.partes[i].name, { type: this.partes[i].file.type });
          formData.append('files', newFile);
        }
      }

    this.setsService.updateSet(formData).subscribe(
        (response: HttpResponse<Set>) => {
          if(response.body){
          this.showEquipment(response.body);
          console.log(response.body)
          }
          this.showSuccess("Set "+ this.set.nombre +" saved succesfully");
        },
        (error) =>{
          console.log("error")
          console.log(error.error);
          this.showError(error.error.message);
        }
      )
    }
  
    listaBonus: Attribute[][] =Array.from({ length: 3 }, () => []);
    partes: any[] = Array.from({ length: 8 }, () => ({}));
    set:Set = Set.crearAuxSet();
    filter:Filters = {
      order:false,
      filter:false,
      awakening:false,
      or:true,
      set:"All sets"
    };
    setFilter!:Ninja;
    attributesFilterList!:Attribute[];
    ref!: DynamicDialogRef;
    sets:Set[]= [];
    responsiveOptions: any[] =[];
    updateSet:boolean = false;
    onSelect(event:UploadEvent, index:number) {

      if(this.partes[index].file){
        this.partes[index].oldFile = JSON.parse(JSON.stringify(this.partes[index].file));
      }
      this.partes[index].file = event.files[0];
      this.partes[index].imageUrl = undefined;
  
    }

    onRemove(event: any, index: number) {
      // Log de la información del archivo eliminado
      console.log("Archivo eliminado: ", event.file);
      console.log("eliminamos el " +index)
      // Eliminar el archivo de la lista uploadedFiles
  
      // Eliminar la URL de la imagen del objeto 'parte' correspondiente
      this.partes[index].file = this.partes[index].oldFile;
      this.partes[index].imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.partes[index].oldFile);

    }
  
  
    showFiles(){
      console.log(this.partes);
      console.log(this.listaBonus);
      console.log(this.set);
    }

    showSuccess(text:string) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
    }
    
    showError(text:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
    }
  
}
