import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccesorieSet, ContentBonus, SaveAccesorieSet, Tipo } from 'src/app/accesories/interfaces/accesories.interfaces';
import { AccesoriesService } from 'src/app/accesories/services/accesories.service';
import { Attribute } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { ListaBonus } from 'src/app/sets/interfaces/set.interfaces';
import { DeleteUserSetDTOResponse, ErrorResponse, Filters } from 'src/app/sets/interfaces/set.interfaces';
import { AdminFilterBonusAttributePanelComponent } from 'src/app/sets/pages/admin-filter-bonus-attribute-panel/admin-filter-bonus-attribute-panel.component';
import { DeleteEquipmentComponent } from 'src/app/sets/pages/admin/delete-equipment/delete-equipment.component';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { DialogConfirmation } from 'src/app/shared/interfaces/attributes.interface,';
import { SetSharedDataService } from 'src/app/shared/services/set-shared-data.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-update-accesorie-set',
  templateUrl: './update-accesorie-set.component.html',
  styleUrls: ['./update-accesorie-set.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class UpdateAccesorieSetComponent implements OnInit  {


  ngOnInit() {
   
    if(this.accesories.length === 0){
      this.accesoriesService.getAccesoriesList().subscribe(
        response => {
          this.accesories=response;
          console.log(response);
          console.log(this.accesories[this.accesories.length-1])
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

  this.contentList.push({tipo:Tipo.Force,bonuses:[]});
  this.contentList.push({tipo:Tipo.Chakra,bonuses:[]});
  this.contentList.push({tipo:Tipo.Agility,bonuses:[]});
  this.contentList.push({tipo:Tipo.Power,bonuses:[]});
  this.contentList.push({tipo:Tipo.FullSetBonus,bonuses:[]});
  }

  constructor(private accesoriesService: AccesoriesService,
      public dialogService: DialogService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private cdr: ChangeDetectorRef,
      private sanitizer: DomSanitizer) {}


      deleteEquipment(set:AccesorieSet){
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
            this.accesoriesService.deleteAccesorieSet(set.nombre).subscribe(
              (response:HttpResponse<DeleteUserSetDTOResponse>) =>{
              //eliminar el set de la lista sets
              const index = this.accesories.findIndex(item => item.nombre === set.nombre);
              if (index !== -1) {
                this.accesories.splice(index, 1);
              }
            },
            (error:ErrorResponse) =>{
              this.showError(error.message);
            }
            )
          }
        })         
      }
  
      showEquipment(set:AccesorieSet){
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
          var found = set.bonuses.find(element => element.tipo === this.contentList[i].tipo);
          if (found) {
              this.contentList[i].bonuses = [];
              for(var j = 0; j < found.bonuses.length; j++){
                  this.contentList[i].bonuses.push(found.bonuses[j]);
              }
          }
        }
        this.set = set;
      }
  
      showFilterPanel(index:number){
        
        const data = {
          attributesFilterList: this.listaBonus[index],
          filters: this.filter
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

      updateAccesorieSet(){

        let opcion:DialogConfirmation = {message:"Are you sure you want to delete set " + this.set.nombre, opcion:""};
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
          if(opcion.opcion === "accept" && this.set.nombre){
            this.saveEquipment();
          }
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
              image:undefined,
              tipo:part.stat
            });
          }else{
            this.set.partes.push({
              nombre:part.name,
              atributo:{nombre:part.stat},
              valor:part.value,
              setName:this.set.nombre,
              image:undefined,
              tipo:part.stat
            });
          }
          if(part.stat)
          attributes.push(part.stat);
        });


        for(var i = 0; i<5;i++){
          let bonus:ContentBonus;
          switch (i) {
            case 0:
              bonus = { tipo: Tipo.Force, bonuses: [] };
              break;
            case 1:
              bonus = { tipo: Tipo.Chakra, bonuses: [] };
              break;
            case 2:
              bonus = { tipo: Tipo.Agility, bonuses: [] };
              break;
            case 3:
              bonus = { tipo: Tipo.Power, bonuses: [] };
              break;
            default:
              bonus = { tipo: Tipo.FullSetBonus, bonuses: [] };
              break;
          }
          for(var j = 0; j<this.contentList[i].bonuses.length;j++){
            if(this.contentList[i].bonuses){
              bonus.bonuses.push(this.contentList[i].bonuses[j]);
              var attribute = this.contentList[i].bonuses[j].nombreAtributo;
              if (!attributes.includes(attribute)) {
                attributes.push(attribute);
              }
            }
           }
          this.set.bonuses.push(bonus);
        }
  
        let body:SaveAccesorieSet = {set:this.set, attributes:attributes};
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

        this.accesoriesService.updateSet(formData).subscribe(
          (response: HttpResponse<AccesorieSet>) => {
            if(response.body){
            this.showEquipment(response.body);
            }
            this.showSuccess("Accesorie set "+ this.set.nombre +" saved succesfully");
          },
          (error) =>{
            this.showError(error.error.message);
          }
        )
      }
    
      listaBonus: Attribute[][] =Array.from({ length: 5 }, () => []);
      contentList:ContentBonus [] = [];//Array.from({ length: 5 }, () => []);
      contentList2:Map<String,ContentBonus> = new Map<String,ContentBonus>();
      partes: any[] = Array.from({ length: 8 }, () => ({}));
      set:AccesorieSet = AccesorieSet.createSetAux();
      filter:Filters = {
        order:false,
        filter:false,
        awakening:false,
        or:true,
        set:"All sets"
      };
      attributesFilterList!:Attribute[];
      ref!: DynamicDialogRef;
      accesories:AccesorieSet[]= [];
      responsiveOptions: any[] =[];
      updateSet:boolean = false;
      panelNames:string[] = Array.from({ length: 5 }, () => (""));

      getTipo(index:number):string{
    
        switch (index) {
              case 0:
                this.panelNames[index]=Tipo.Force;
                return Tipo.Force;
              case 1:
                this.panelNames[index]=Tipo.Chakra;
                return Tipo.Chakra;
              case 2:
                this.panelNames[index]=Tipo.Agility;
                return Tipo.Agility;
              case 3:
                this.panelNames[index]=Tipo.Power;
                return Tipo.Power;
              default:
                this.panelNames[index]=Tipo.FullSetBonus;
                return Tipo.FullSetBonus;
            }
      }
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
