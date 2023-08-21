import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Attribute, AttributeName, Awakening, AwakeningStat, ChakraNature, Formation, Ninja, NinjaFormationUtils, NinjaSexUtils, NinjaStat, NinjaType, NinjaTypeUtils, SaveNinja, Sex, Skill, SkillType, StatsAttribute, WrapEnumsDropdown } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { NinjasService } from 'src/app/ninjas/services/ninjas-service.service';
import { DeleteUserSetDTOResponse, ErrorResponse, Filters } from 'src/app/sets/interfaces/set.interfaces';
import { AdminFilterBonusAttributePanelComponent } from 'src/app/sets/pages/admin-filter-bonus-attribute-panel/admin-filter-bonus-attribute-panel.component';
import { DeleteEquipmentComponent } from 'src/app/sets/pages/admin/delete-equipment/delete-equipment.component';
import { ListaBonusUtils } from 'src/app/sets/utils/lista-bonus-utils';
import { DialogConfirmation } from 'src/app/shared/interfaces/attributes.interface,';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-update-ninja',
  templateUrl: './update-ninja.component.html',
  styleUrls: ['./update-ninja.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class UpdateNinjaComponent implements OnInit{


  attributesFilterList!:Attribute[];
  ref!: DynamicDialogRef;

  filter:Filters = {
    order:false,
    filter:false,
    awakening:false,
    or:true,
    set:"All sets"
  };

  constructor(public dialogService: DialogService,
    private ninjasService:NinjasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer){}

  showFilterPanel(skill:Skill){
    
    const data = {
      attributesFilterList: skill.attributes,
      //attributesFilterList: this.listaBonus[index],
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
      this.refreshSkillLists = false;
          setTimeout(() => {
            this.refreshSkillLists = true;
          });
    })
  }

  refreshSkillLists:boolean = true;

  showFilterPanelAwaken(awaken:Awakening){
    
    const data = {
      attributesFilterList: awaken.stats,
      //attributesFilterList: this.listaBonus[index],
      level:true,
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
    let opcion:DialogConfirmation = {message:"Are you sure you want to save equipment " + this.ninja.name, opcion:""};
    const data = {
      wrap:opcion
    };
    this.ref = this.dialogService.open(DeleteEquipmentComponent, {
      header: 'Confirmation',
      width: '50%',
      height:'30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: data
    });

    this.ref.onClose.subscribe(()=>{
      console.log(opcion);
      if(opcion.opcion === "accept" && this.ninja.name){
        this.prepareEquipment();
      }
    })         
  }

  prepareEquipment(){
    let attributes:string[] = [];
    this.ninja.stats = [];
    this.ninja.skills = [];
    this.ninja.awakenings = [];
    this.ninja.chakraNature = ChakraNature.Unactivated;
    if(this.selectedType.value  && this.selectedType.value.length > 1){
      this.ninja.type =NinjaTypeUtils.getValueFromString(this.selectedType.value);
    }
    if(this.selectedPosition.value  && this.selectedPosition.value.length > 1){
      this.ninja.formation =NinjaFormationUtils.getValueFromString(this.selectedPosition.value);
    }
    if(this.selectedSex.value  && this.selectedSex.value.length > 1){
      this.ninja.sex =NinjaSexUtils.getValueFromString(this.selectedSex.value);
    }

    let stat:NinjaStat ={level:"",statsAttributes:[]};
    stat.level = "120";
    stat.statsAttributes = [];
    this.stats.forEach( stats =>{
      stat.statsAttributes.push(stats);
    });
    this.ninja.stats.push(stat);

    this.skills.forEach(skill =>{
      if(skill.nombre && skill.nombre.length >1){
        this.ninja.skills.push(skill);
      }
    });

    let awakenings:Awakening [] = [];
    this.awakenings.forEach(awaken =>{
      if(awaken.name && awaken.name.length > 1){
        awaken.stats.forEach(stat =>{
          awaken.level = stat.level;
          stat.ninja = this.ninja.name;
          stat.type = awaken.type;
        });
        awakenings.push(awaken);
      }
    });
    this.ninja.awakenings = JSON.parse(JSON.stringify(awakenings));

    this.ninja.skills.forEach(skill => {
      skill.attributes.forEach(attribute => {
        if (!attributes.includes(attribute.attributeName)) {
          attributes.push(attribute.attributeName);
        }
      });
    });
    
    this.ninja.stats.forEach(stat => {
      stat.statsAttributes.forEach(attribute => {
        if (!attributes.includes(attribute.attribute_name)) {
          attributes.push(attribute.attribute_name);
        }
      });
    });
    
    this.ninja.awakenings.forEach(awaken => {
      awaken.stats.forEach(attribute => {
        if (!attributes.includes(attribute.attributeName)) {
          attributes.push(attribute.attributeName);
        }
      });
    });

    console.log(this.ninja);
    console.log(this.uploadedFiles);
    let body:SaveNinja = {ninja:this.ninja, attributes:attributes};
    const formData = new FormData();

    formData.append('body', JSON.stringify(body));

    this.uploadedFiles = [];
    const file = this.faceNinjaPhoto.file;
    if(this.faceNinjaPhoto.file){
      let newFile = new File([this.faceNinjaPhoto.file], "face.jpg", { type: this.faceNinjaPhoto.file.type });
        formData.append('files', newFile);
        this.uploadedFiles.push(newFile);
    }
    if(this.statsNinjaPhoto.file){
      let newFile = new File([this.statsNinjaPhoto.file], "stats.jpg", { type: this.statsNinjaPhoto.file.type });
        formData.append('files', newFile);
        this.uploadedFiles.push(newFile);
    }
   /*for (let i = 0; i < this.partes.length; i++) {
      const file = this.partes[i].file;
      if(file && file.name && this.partes[i].file){
        let newFile = new File([this.partes[i].file], this.partes[i].name, { type: this.partes[i].file.type });
        formData.append('files', newFile);
        this.uploadedFiles.push(newFile);
      }
    }*/

 
   this.ninjasService.updateNinja(formData).subscribe(
      (response: HttpResponse<Ninja>) => {
     
        const statusCode = response.status; // Código de respuesta
       
        // Resto del manejo de la respuesta
        this.showSuccess("Set "+ this.ninja.name +" saved succesfully");
      },
      (error) =>{
        this.showError(error.error.message);
      }
    )
  }

  listaBonus: Attribute[][] =Array.from({ length: 5 }, () => []);
  uploadedFiles: File[] = [];
  partes: any[] = Array.from({ length: 8 }, () => ({}));
  ninja:Ninja = Ninja.createNinja();
  skills:Skill[] = [];
 // stats2!:NinjaStat ;
  stats:StatsAttribute[] = [];
  awakenings:Awakening[] = [];
  ninjatypes:WrapEnumsDropdown[] = [];
  selectedType:WrapEnumsDropdown = {value:""}; 
  ninjaPosition:WrapEnumsDropdown[] = [];
  selectedPosition:WrapEnumsDropdown = {value:""};
  sexs:WrapEnumsDropdown[] = [];
  selectedSex:WrapEnumsDropdown ={value:""};
  faceNinjaPhoto:any = {};
  statsNinjaPhoto:any = {};
  ninjas:Ninja[]=[];
  responsiveOptions:any[] = [];
  showInputs:boolean = false;
  refreshList:boolean = true;
  showNinja(ninja:Ninja){
   
    //this.stats = JSON.parse(JSON.stringify(ninja.stats.));

    ninja.stats.forEach(stat=>{
      this.stats = JSON.parse(JSON.stringify(stat.statsAttributes));
    })
    this.skills = JSON.parse(JSON.stringify(ninja.skills));
    this.awakenings = JSON.parse(JSON.stringify(ninja.awakenings));
    this.ninja = JSON.parse(JSON.stringify(ninja));
    console.log(this.stats);
    let exists:boolean = true;
    this.skills.forEach(skill =>{
      if(SkillType.NormalAttack === skill.type){
        exists = false;
      }
    });

    if(exists){
      this.skills.push({
        nombre:"",
        type:SkillType.NormalAttack,
        skillText:"",
        attributes:[]
      });
    }

    let talent:boolean = true;
    let skill:boolean = true;
    this.awakenings.forEach(awaken =>{
      if(SkillType.Talent === awaken.type){
        talent = false;
      }
      if(SkillType.Skill === awaken.type){
        skill = false;
      }
    });

    if(talent){
      this.awakenings.push({
        name:"",
        type:SkillType.Talent,
        level:"120",
        skillText:"",
        stats:[]
      });
    }
    if(skill){
      this.awakenings.push({
        name:"",
        type:SkillType.Skill,
        level:"120",
        skillText:"",
        stats:[]
      });
    }

    this.selectedSex.value = ninja.sex;
    this.selectedType.value = ninja.type;
    this.selectedPosition.value = ninja.formation;

    //this.faceNinjaPhoto.file = undefined;
    this.onRemove(undefined,0);
    if(ninja.ninjaImage){
      this.faceNinjaPhoto.oldFile = ninja.ninjaImage;
      this.faceNinjaPhoto.imageUrl = this.sanitizer.
      bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.faceNinjaPhoto.oldFile);
    }

    this.onRemove(undefined,1);
   // this.statsNinjaPhoto.file = undefined;
    if(ninja.ninjaStatImage){
      this.statsNinjaPhoto.oldFile = ninja.ninjaStatImage;
      this.statsNinjaPhoto.imageUrl = this.sanitizer.
      bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.statsNinjaPhoto.oldFile);
    }
    this.showInputs = true;
    this.cdr.detectChanges();
    console.log(this.stats);
  }

  deleteNinja(ninja:Ninja){
    let opcion:DialogConfirmation = {message:"Are you sure you want to delete ninja " + ninja.name, opcion:""};
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
      if(opcion.opcion === "accept" && ninja.name){
        this.ninjasService.deleteNinja(ninja.name).subscribe(
          (response:HttpResponse<DeleteUserSetDTOResponse>) =>{
          
          const index = this.ninjas.findIndex(ninja1 => ninja1.name === ninja.name);
          if (index !== -1) {
            this.ninjas.splice(index, 1);
          }
          if(ninja.name == this.ninja.name){
            this.showInputs = false;
          }
          this.refreshList = false;
          setTimeout(() => {
            this.refreshList = true;
          });
        },
        (error:ErrorResponse) =>{
          this.showError(error.message);
        }
        )
      }
    })
  }

  onSelect(event:UploadEvent, index:number) {
    this.partes[index].file = event.files[0];
    if(index == 0){
      this.faceNinjaPhoto.file = event.files[0];
      this.faceNinjaPhoto.name = event.files[0].name;
      this.faceNinjaPhoto.imageUrl = undefined;
    }
    if(index == 1){
      this.statsNinjaPhoto.file = event.files[0];
      this.statsNinjaPhoto.name = event.files[0].name;
      this.statsNinjaPhoto.imageUrl = undefined;
    }

  }

  onRemove(event: any, index: number) {
    if(index == 0){
      this.faceNinjaPhoto.file = undefined;
      if(this.faceNinjaPhoto.oldFile){
        this.faceNinjaPhoto.imageUrl = this.sanitizer.
        bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.faceNinjaPhoto.oldFile);
      }
    }
    if(index == 1){
      this.statsNinjaPhoto.file = undefined;
      if(this.faceNinjaPhoto.oldFile){
        this.statsNinjaPhoto.imageUrl = this.sanitizer.
        bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.statsNinjaPhoto.oldFile);
      }
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

      this.ninjasService.getAllNinjas().subscribe(
        response =>{
          this.ninjas = response.ninjas;
        }
      );

      Object.values(NinjaType).forEach(
        element =>{
          this.ninjatypes.push({value:element});
        }
      );

      Object.values(Formation).forEach(
        element =>{
          this.ninjaPosition.push({value:element});
        }
      );

      Object.values(Sex).forEach(
        element =>{
          this.sexs.push({value:element});
        }
      );

      console.log(this.ninjatypes)
      console.log(this.ninjaPosition)
      console.log(this.sexs)

      let attributes:Attribute[] = [];
      let attributes1:Attribute[] = [];
      let attributes2:Attribute[] = [];
      attributes.push(
        { attributeName:"avoid injury rate",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );
      attributes.push(
        { attributeName:"defense",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );

      attributes1.push(
        { attributeName:"HP",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );
      attributes1.push(
        { attributeName:"attack",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );

      attributes2.push(
        { attributeName:"damage rate",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:50,
          time:"battle ends" }
      );
      attributes2.push(
        { attributeName:"weaken enemy attack",
          action:"increase",
          impact:"self",
          condition:"ninja is alive",
          value:30,
          time:"battle ends" }
      );

      this.skills.push({
        nombre:"Blade Dance",
        type:SkillType.Talent,
        skillText:"Increases massive agility, force, and health by percentage. Increase 86% speed, 65% damage rate and 65% avoid injury. When this ninja is in battle, increase all allies speed by 112%, avoid injury by 30%, hp by 30%, and penetrating injury by 30%. Increase ally water chakra and fire chakra ninjas' damage rate by 30%, attack by 30%, defenses by 30%, and final damage reduction by 20%.Decrease all enemies block rate and crit rate by 20%. Ignore enemy 55% control rate and 150% reflect damage. Immune to imprison, freeze, and death seed.",
        attributes:attributes
      });
      this.skills.push({
        nombre:"",
        type:SkillType.NormalAttack,
        skillText:"",
        attributes:attributes1
      });
      this.skills.push({
        nombre:"Sanshoyu Bifu",
        type:SkillType.Skill,
        skillText:"Attack all enemies with 360% growth rate, make all enemies enter poisoning, burst, and bleeding with 120% coefficient, and 30% Corrosion state for 2 rounds. Make all allies enter 30% Pyroblast state for 2 rounds, recover all allies hp rate by 120%, dispel all enemies buffs, and applies Painful Will to all enemies for 2 rounds. Recovers 68 fury for self, 30 for allies.",
        attributes:attributes2
      });

      this.stats.push({
        attribute_name:AttributeName.Agility,
        value:40000
      });
      this.stats.push({
        attribute_name:AttributeName.AgilityGrowthRate,
        value:42
      });
      this.stats.push({
        attribute_name:AttributeName.Chakra,
        value:39000
      });
      this.stats.push({
        attribute_name:AttributeName.ChakraGrowthRate,
        value:41
      });
      this.stats.push({
        attribute_name:AttributeName.Force,
        value:39000
      });
      this.stats.push({
        attribute_name:AttributeName.ForceGrowthRate,
        value:38
      });
      this.stats.push({
        attribute_name:AttributeName.Power,
        value:45000
      });
      this.stats.push({
        attribute_name:AttributeName.PowerGrowthRate,
        value:46
      });

      
      let stats1:AwakeningStat[] = [];
      stats1.push({
        name:"",
        ninja:"",
        level:"",
        attributeName:"avoid injury rate",
        type:SkillType.Talent,
        action:"increase",
        impact:"all allies",
        value:30,
        condition:"ninja is alive",
        time:"battle ends"
      });
      stats1.push({
        name:"",
        ninja:"",
        level:"",
        attributeName:"attack",
        type:SkillType.Talent,
        action:"increase",
        impact:"all allies",
        value:30,
        condition:"ninja is alive",
        time:"battle ends"
      });
      this.awakenings.push({
        name:"Body Flicker Technique",
        type:SkillType.Talent,
        level:"1ri",
        skillText:"Naturally resists enemies' ignore defense by 50%. When attacked, 100% chance to add 30 fury to water chakra allies, and dispels 2 random allies' debuffs.",
        stats:stats1
      });
      let stats2:AwakeningStat[] = [];
      stats2.push({
        name:"",
        ninja:"",
        level:"",
        attributeName:"cc resistance",
        type:SkillType.Skill,
        action:"increase",
        impact:"all allies",
        value:30,
        condition:"ninja is alive",
        time:"battle ends"
      });
      stats2.push({
        name:"",
        ninja:"",
        level:"",
        attributeName:"attack",
        type:SkillType.Skill,
        action:"decrease",
        impact:"all enemies",
        value:30,
        condition:"ninja is alive",
        time:"battle ends"
      });
      /*this.awakenings.push({
        name:"",
        type:SkillType.NormalAttack,
        level:"120",
        skillText:"",
        stats:[]
      });*/
      this.awakenings.push({
        name:"",
        type:SkillType.Skill,
        level:"120",
        skillText:"",
        stats:stats2
      });


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

      this.ninja.name="Naruto 7th Hokage";

    }

}
