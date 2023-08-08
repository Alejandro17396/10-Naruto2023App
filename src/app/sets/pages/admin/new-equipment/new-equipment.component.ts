import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Attribute, Ninja } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { FilterNinjaPanelComponent } from 'src/app/ninjas/pages/filter-ninja-panel-component/filter-ninja-panel-component.component';
import { Bonus, EffectEnum, Filters, Parte, SaveEquipment, Set} from 'src/app/sets/interfaces/set.interfaces';
import { SetsService } from 'src/app/sets/services/sets.service';
import { AdminFilterBonusAttributePanelComponent } from '../../admin-filter-bonus-attribute-panel/admin-filter-bonus-attribute-panel.component';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { HttpResponse } from '@angular/common/http';
import { DialogConfirmation } from 'src/app/shared/interfaces/attributes.interface,';
import { DeleteEquipmentComponent } from '../delete-equipment/delete-equipment.component';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.component.html',
  styleUrls: ['./new-equipment.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class NewEquipmentComponent {


  filter:Filters = {
    order:false,
    filter:false,
    awakening:false,
    or:true,
    set:"All sets"
  };

  attributesFilterList!:Attribute[];
  ref!: DynamicDialogRef;

  constructor(public dialogService: DialogService,
    private setsService:SetsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef){}

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

  saveEquipment(){
    let opcion:DialogConfirmation = {message:"Are you sure you want to save equipment " + this.set.nombre, opcion:""};
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
        this.prepareEquipment();
      }
    })         
  }

  prepareEquipment(){
    let attributes:string[] = [];
    this.set.partes = [];
    this.set.bonuses = [];
    this.partes.forEach(part =>{
      this.set.partes.push({
        nombre:part.name,
        atributo:{nombre:part.stat},
        valor:part.value,
        setName:this.set.nombre,
        image:part.file
      });
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
      for(var j = 0; j<this.listaBonus[i].length;j++){
        if(this.listaBonus[i][j]){
          bonus.listaBonus.push(ListaBonusUtils.AttributeNinjaToListaBonus(this.listaBonus[i][j]));
          attributes.push(this.listaBonus[i][j].attributeName);
        }
       }
      this.set.bonuses.push(bonus);
    }
    console.log(this.set);
    console.log(this.uploadedFiles);
    let body:SaveEquipment = {set:this.set, attributes:attributes};
    const formData = new FormData();

    body.set.partes.forEach(part =>{
      part.image = undefined;
    });

    formData.append('body', JSON.stringify(body));

    this.uploadedFiles = [];
    for (let i = 0; i < this.partes.length; i++) {
      // console.log(this.partes[i])
      const file = this.partes[i].file;
      if(file && file.name && this.partes[i].file){
        let newFile = new File([this.partes[i].file], this.partes[i].name, { type: this.partes[i].file.type });
        formData.append('files', newFile);
        this.uploadedFiles.push(newFile);
      }
    }

    console.log(formData);
    console.log(this.uploadedFiles);
    this.setsService.saveSet(formData).subscribe(
      (response: HttpResponse<Set>) => {
        console.log("succes")
        const statusCode = response.status; // Código de respuesta
        console.log(statusCode);
        // Resto del manejo de la respuesta
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
  uploadedFiles: File[] = [];
  partes: any[] = Array.from({ length: 8 }, () => ({}));
  set:Set = Set.crearAuxSet();

  onSelect(event:UploadEvent, index:number) {
        this.partes[index].file = event.files[0];
  }

  onRemove(event: any, index: number) {
    // Eliminar el archivo de la lista uploadedFiles
    this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== event.file.name);

    if(index > -1){
      this.partes[index].file = undefined;
    }
  }

  showFiles(){
    console.log(this.uploadedFiles);
  }
    showSuccess(text:string) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
    }
  
    showError(text:string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
    }

    ngOnInit(): void{
      this.partes[0].name = "yaksa armor";
      this.partes[0].value = 67500;
      this.partes[0].stat = "physical defense";

      this.partes[1].name = "yaksa coat";
      this.partes[1].value = 67500;
      this.partes[1].stat = "strategy defense";

      this.partes[2].name = "yaksa headband";
      this.partes[2].value = 67500;
      this.partes[2].stat = "physical defense";

      this.partes[3].name = "yaksa belt";
      this.partes[3].value = 675000;
      this.partes[3].stat = "power";

      this.partes[4].name = "yaksa boots";
      this.partes[4].value = 67500;
      this.partes[4].stat = "speed";

      this.partes[5].name = "yaksa kunai";
      this.partes[5].value = 67500;
      this.partes[5].stat = "physical attack";

      this.partes[6].name = "yaksa scroll";
      this.partes[6].value = 67500;
      this.partes[6].stat = "strategy atatck";
      
      this.partes[7].name = "yaksa shuriken";
      this.partes[7].value = 67500;
      this.partes[7].stat = "physical attack";

      this.listaBonus[0].push(
        { attributeName:"avoid injury rate",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );
      this.listaBonus[0].push(
        { attributeName:"defense",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );

      this.listaBonus[1].push(
        { attributeName:"HP",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );
      this.listaBonus[1].push(
        { attributeName:"attack",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );

      this.listaBonus[2].push(
        { attributeName:"damage rate",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:50,
          time:"battle ends" }
      );
      this.listaBonus[2].push(
        { attributeName:"attack",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );

      this.set.nombre="yaksa set";

    }

}
