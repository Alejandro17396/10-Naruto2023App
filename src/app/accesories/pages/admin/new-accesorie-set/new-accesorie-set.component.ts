import { ChangeDetectorRef, Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Attribute } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { Filters, SaveEquipment } from 'src/app/sets/interfaces/set.interfaces';
import { AccesoriesService } from '../../../services/accesories.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminFilterBonusAttributePanelComponent } from 'src/app/sets/pages/admin-filter-bonus-attribute-panel/admin-filter-bonus-attribute-panel.component';
import { DialogConfirmation } from 'src/app/shared/interfaces/attributes.interface,';
import { DeleteEquipmentComponent } from 'src/app/sets/pages/admin/delete-equipment/delete-equipment.component';
import { HttpResponse } from '@angular/common/http';
import { AccesorieSet, ContentBonus, SaveAccesorieSet, Tipo } from 'src/app/accesories/interfaces/accesories.interfaces';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-new-accesorie-set',
  templateUrl: './new-accesorie-set.component.html',
  styleUrls: ['./new-accesorie-set.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class NewAccesorieSetComponent {

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
    private accesoriesService:AccesoriesService,
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
        image:part.file,
        tipo:part.stat
      });
      var attribute = part.stat;
      if (!attributes.includes(attribute)) {
        attributes.push(attribute);
      }
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
      for(var j = 0; j<5;j++){
        if(this.listaBonus[i][j]){
          bonus.bonuses.push(ListaBonusUtils.AttributeNinjaToListaBonus(this.listaBonus[i][j]));
          //attributes.push(this.listaBonus[i][j].attributeName);
          var attribute = this.listaBonus[i][j].attributeName;
          if (!attributes.includes(attribute)) {
            attributes.push(attribute);
          }
        }
      }
      this.set.bonuses.push(bonus);
    }
    console.log(this.set);
    console.log(this.uploadedFiles);
    let body:SaveAccesorieSet = {set:this.set, attributes:attributes};
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

    console.log(body);
    console.log(this.uploadedFiles);
   this.accesoriesService.saveSet(formData).subscribe(
      (response: HttpResponse<AccesorieSet>) => {
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



  listaBonus: Attribute[][] =Array.from({ length: 5 }, () => []);
  uploadedFiles: File[] = [];
  partes: any[] = Array.from({ length: 8 }, () => ({}));
  set:AccesorieSet = AccesorieSet.createSetAux();

  onSelect(event:UploadEvent, index:number) {
        this.partes[index].file = event.files[0];
  }

  onRemove(event: any, index: number) {
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
      this.partes[0].name = "yaksa headband";
      this.partes[0].value = 67500;
      this.partes[0].stat = "force";

      this.partes[1].name = "yaksa necklace";
      this.partes[1].value = 67500;
      this.partes[1].stat = "force";

      this.partes[2].name = "yaksa pendant";
      this.partes[2].value = 67500;
      this.partes[2].stat = "chakra";

      this.partes[3].name = "yaksa amulet";
      this.partes[3].value = 675000;
      this.partes[3].stat = "chakra";

      this.partes[4].name = "yaksa bangle";
      this.partes[4].value = 67500;
      this.partes[4].stat = "agility";

      this.partes[5].name = "yaksa bracelet";
      this.partes[5].value = 67500;
      this.partes[5].stat = "agility";

      this.partes[6].name = "yaksa gloves";
      this.partes[6].value = 67500;
      this.partes[6].stat = "power";
      
      this.partes[7].name = "yaksa ring";
      this.partes[7].value = 67500;
      this.partes[7].stat = "power";

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
        { attributeName:"weaken enemy attack",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );

      this.listaBonus[3].push(
        { attributeName:"weaken enemy defense",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:50,
          time:"battle ends" }
      );
      this.listaBonus[3].push(
        { attributeName:"attack",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );

      this.listaBonus[4].push(
        { attributeName:"damage rate",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:50,
          time:"battle ends" }
      );
      this.listaBonus[4].push(
        { attributeName:"attack",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );

      this.set.nombre="yaksa accessories";

    }
}
