import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserFormationDTO } from '../../interfaces/formations.interface';
import { Attribute, Attribute2, Formation, ICreateUserNinja, Ninja, NinjaUserFormationDTO, Skill } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { NinjasService } from 'src/app/ninjas/services/ninjas-service.service';
import { AccesoriesService } from 'src/app/accesories/services/accesories.service';
import { SetsService } from 'src/app/sets/services/sets.service';
import { SetItemsService } from 'src/app/sets/services/set-items-service.service';
import { AccesorieSetItemsService } from 'src/app/accesories/services/accesorie-set-items.service';
import { Bonus, ListaBonus, UserSetDTOResponse,Set,Parte as ParteSet, TypeItemSet, ICreateUserSet } from 'src/app/sets/interfaces/set.interfaces';
import { AccesorieSet, ContentBonus, UserAccesorieSetDTO,Parte as ParteAccesorio, TypeAccesorieItemSet, ICreateUserAccesorieSet, Tipo } from 'src/app/accesories/interfaces/accesories.interfaces';
import { ShowNinjaUserComponent } from 'src/app/ninjas/pages/show-ninja-user/show-ninja-user.component';
import { HttpResponse } from '@angular/common/http';
import { NinjaUtils } from 'src/app/ninjas/utils/NinjaUtils';
import { SaveElement } from 'src/app/shared/interfaces/attributes.interface,';
import { concatMap } from 'rxjs';
import { NinjasSharedDataService } from 'src/app/ninjas/services/ninjas-shared-data.service';
import { ShowUserFormationComponent } from '../show-user-formation/show-user-formation.component';
import { FormationsSharedDataService } from '../../services/formations-shared-data.service';

@Component({
  selector: 'app-create-user-formation',
  templateUrl: './create-user-formation.component.html',
  styleUrls: ['./create-user-formation.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class CreateUserFormationComponent implements OnInit{

  ngOnInit(): void {

    this.ninjasService.getNinjas().subscribe(
      response =>{
        this.ninjas = response.ninjas;
      }
    );
    this.ninjasService.getUserNinjas().subscribe((response)=>{
      this.ninjasUser = response;
    });
    
    this.formationsService.getUserFormations().subscribe(
      response =>{
        this.formations = response;
        if(!this.showFormation){
          this.showFormation = JSON.parse(JSON.stringify(response[0]));
          this.formationName = this.showFormation.name;
          this.showFormation.ninjas.forEach(
            ninja =>{
              if(ninja.formation && ninja.formation == Formation.Support){
                this.supports.push(ninja);
              }
              if(ninja.formation && ninja.formation == Formation.Assaulter){
                this.assaulters.push(ninja);
              }
              if(ninja.formation && ninja.formation == Formation.Vanguard){
                this.vanguards.push(ninja);
              }
            }
          );
          this.calculateFormationTalent();
        }
      }
    );
    this.formationsSharedDataService._userFormationToModify.subscribe(
      response =>{
        if(response){
          this.showFormation = JSON.parse(JSON.stringify(response));
          this.formationName = this.showFormation.name;
          this.showFormation.ninjas.forEach(
            ninja =>{
              if(ninja.formation && ninja.formation == Formation.Support){
                this.supports.push(ninja);
              }
              if(ninja.formation && ninja.formation == Formation.Assaulter){
                this.assaulters.push(ninja);
              }
              if(ninja.formation && ninja.formation == Formation.Vanguard){
                this.vanguards.push(ninja);
              }
            }
          );
          this.calculateFormationTalent();
        }
      }
    );

  }

  calculateFormationTalent(){
    if(!this.showFormation){
      return;
    }
    const body: Map<string,string> = new Map<string,string>();
    this.showFormation.ninjas.forEach(
      ninja =>{
        body.set(ninja.ninja.name,"SKILL");
      }
    );
    this.formationsService.createFormationByNinjas(body).subscribe(
      response =>{
        this.showFormation.mergedTalentAttributes = response.mergedTalentAttributes;
        this.showFormation.finalSkillsAttributes = response.finalSkillsAttributes;
      }
    );

  }

  filter2(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'name', 'contains');
    console.log(elemento2);
  }

  filter(elemento:any,elemento2:any,field:string){
    if(elemento.target.value){
      elemento2.filter(elemento.target.value,field, 'contains');
    }else{

      elemento2.filter(" ",field, 'contains');
    }
  }

  constructor(private formationsService:FormationService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef,
    private ninjasService:NinjasService,
    private accesoriesService:AccesoriesService,
    private setsService:SetsService,
    private setItemsService:SetItemsService,
    private accesorieSetItemsService:AccesorieSetItemsService,
    private ninjasDataSharedService:NinjasSharedDataService,
    private formationsSharedDataService:FormationsSharedDataService){}

  formationName:string = "";
  formations:UserFormationDTO[] = [];
  selectedFormation!:UserFormationDTO;
  showFormation!:UserFormationDTO;
  supports:NinjaUserFormationDTO[] = [];
  assaulters:NinjaUserFormationDTO[] = [];
  vanguards:NinjaUserFormationDTO[] = [];

  accesorieSetName:string = "";
  setName:string = "";
  ninjaName:string = "";
  
  rechargeNinjasList:boolean = true;
  selectedNinja!:Ninja;
  
  ninja:Ninja = Ninja.createNinja();
  ninjaShow:NinjaUserFormationDTO = new NinjaUserFormationDTO();
  bonusesMap: Map<string, Bonus> =new Map<string, Bonus>();
  setsByItemMap: Map<string, Set> =new Map<string, Set>(); 
  listaBonus: ListaBonus[] = [];
  typeItemsAdded:string [] = [];

  bonusesAccesorieMap: Map<string, ContentBonus> =new Map<string, ContentBonus>();
  typeAccesorieItemsAdded:string [] = [];
  accesoriesByItemMap: Map<string, AccesorieSet> =new Map<string, AccesorieSet>(); 
  //dialogInfo
  skillText:string = "";
  titulo:string = "";
  visible:boolean = false;
  position:string = "left";


  //listas de elementos de las tablas
  ninjasUser:NinjaUserFormationDTO [] = [];
  selectedNinjaUser!:NinjaUserFormationDTO;
  ninjas:Ninja [] = [];
  userSets:UserSetDTOResponse [] = []; 
  setsItems:ParteSet[]=[];
  userAccesoriesSet:UserAccesorieSetDTO[] = [];
  accesoriesItems:ParteAccesorio[]= [];


  modify:boolean =false;

  equipmentUserBonusList:ListaBonus [] = [];
  accesoriesUserBonusList:ListaBonus [] = [];
  ninjaUserBonusList:Attribute[] = [];
  finalNinjaUserBonusList:Attribute2[] = [];


  rechargeFormations(cadena:string){
    this.formationsService.getUserFormations().subscribe(
      response =>{
        this.formations = response;
        response.forEach(formation =>{
          if(formation.name === this.showFormation.name){
            this.showFormation = formation;
            this.changeShowFormation(formation,1);
          }
        })
      }
    );
  }

  changeShowFormation(formation:UserFormationDTO,rowIndex:number){
    console.log(formation)
    console.log(this.ninjasUser)
    this.showFormation= JSON.parse(JSON.stringify(formation));
    this.supports = [];
    this.assaulters = [];
    this.vanguards = [];
    this.showFormation.ninjas.forEach(
      ninja =>{
        if(ninja.formation && ninja.formation == Formation.Support){
          this.supports.push(ninja);
        }
        if(ninja.formation && ninja.formation == Formation.Assaulter){
          this.assaulters.push(ninja);
        }
        if(ninja.formation && ninja.formation == Formation.Vanguard){
          this.vanguards.push(ninja);
        }
      }
    );
    this.calculateFormationTalent();
  }

  @ViewChild('childComponent') hijoComponent!: ShowUserFormationComponent;

  addNinja(ninja:Ninja){
    this.ninjaShow.ninja = ninja;
     let ninjaUserAux = new NinjaUserFormationDTO();
     ninjaUserAux.ninja = ninja;
     let exists:boolean = false;
     if(this.showFormation.ninjas.length >= 4){
      this.showError("There is already 5 ninjas in formation");
      return;
     }
      this.showFormation.ninjas.forEach(
        ninja2 =>{
          if(ninja2.ninja.name === ninja.name){
            exists=true;
          }
        }
      );

      if(exists){
        this.showError("Ninja is already in formation");
        return;
      }

      if(ninja.formation === Formation.Support && this.showFormation.supports &&
        this.showFormation.supports.length>=3){
          this.showError("there is already 3 supports");
          return;
      }
      if(ninja.formation === Formation.Assaulter && this.showFormation.assaulters &&
        this.showFormation.assaulters.length>=2){
          this.showError("there is already 2 assaulters");
          return;
      }
      if(ninja.formation === Formation.Vanguard && this.showFormation.vanguards &&
        this.showFormation.vanguards.length>=1){
          this.showError("there is already 1 vanguard");
          return;
      }

      this.showFormation.ninjas.push(ninjaUserAux);
      if(ninja.formation === Formation.Support){
        this.showFormation.supports?.push(ninjaUserAux);
      }
      if(ninja.formation === Formation.Assaulter){
        this.showFormation.assaulters?.push(ninjaUserAux);
      }
      if(ninja.formation === Formation.Vanguard){
        this.showFormation.vanguards?.push(ninjaUserAux);
      }
      
      this.calculateFormationTalent();
      //this.hijoComponent.setTabTo(0);
  }

  addNinjaUser(ninjaUserAux:NinjaUserFormationDTO){
     this.ninjaShow.ninja = ninjaUserAux.ninja;
     let ninja = ninjaUserAux.ninja;
     ninjaUserAux.ninja = ninja;
     let exists:boolean = false;
     console.log("hola");
     console.log(this.showFormation);
     if(this.showFormation.ninjas.length >= 4){
      this.showError("There is already 5 ninjas in formation");
      return;
     }
      this.showFormation.ninjas.forEach(
        ninja2 =>{
          if(ninja2.ninja.name === ninja.name){
            exists=true;
          }
        }
      );

      if(exists){
        this.showError("Ninja is already in formation");
        return;
      }

      if(ninja.formation === Formation.Support && this.showFormation.supports &&
        this.showFormation.supports.length>=3){
          this.showError("there is already 3 supports");
          return;
      }
      if(ninja.formation === Formation.Assaulter && this.showFormation.assaulters &&
        this.showFormation.assaulters.length>=2){
          this.showError("there is already 2 assaulters");
          return;
      }
      if(ninja.formation === Formation.Vanguard && this.showFormation.vanguards &&
        this.showFormation.vanguards.length>=1){
          this.showError("there is already 1 vanguard");
          return;
      }

      this.showFormation.ninjas.push(ninjaUserAux);
      if(ninja.formation === Formation.Support){
        this.showFormation.supports?.push(ninjaUserAux);
      }
      if(ninja.formation === Formation.Assaulter){
        this.showFormation.assaulters?.push(ninjaUserAux);
      }
      if(ninja.formation === Formation.Vanguard){
        this.showFormation.vanguards?.push(ninjaUserAux);
      }
      
      this.calculateFormationTalent();
      //this.hijoComponent.setTabTo(0);
  }


  showDialog(skill:Skill){
    this.titulo = skill.nombre+" ("+skill.type+")";
    this.skillText = skill.skillText;
    this.visible = true;
  }

  showNinja(ninja:NinjaUserFormationDTO,index:number){
    if(ninja?.ninja){
      this.ninja = ninja.ninja;
    }else{
      this.ninja = Ninja.createNinja();
    }
   
    this.ninjaShow = ninja;
    let listaBonusL:ListaBonus [] = [];
    console.log(ninja);
    if(this.ninjaShow.accesories && this.ninjaShow.accesories.nombre){
      this.accesorieSetName = this.ninjaShow.accesories.nombre;
    }
    if(this.ninjaShow.equipment && this.ninjaShow.equipment.nombre){
      this.setName =  this.ninjaShow.equipment.nombre;
    }
    if(this.ninjaShow.nombre){
      this.ninjaName =  this.ninjaShow.nombre;
    }
  }

  showSuccess(text:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showError(text:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }

}
