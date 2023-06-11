import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormationElement, UserFormationDTO } from '../../interfaces/formations.interface';
import { Formation, NinjaUserFormationDTO, SkillType } from 'src/app/ninjas/interfaces/Ninja.interfaces';

@Component({
  selector: 'app-view-user-formation',
  templateUrl: './view-user-formation.component.html',
  styleUrls: ['./view-user-formation.component.css'],
  providers:[DialogService,MessageService,ConfirmationService]
})
export class ViewUserFormationComponent implements OnInit{

  ngOnInit(): void {
    this.formationsService.getUserFormations().subscribe(
      response =>{
        this.formations = response;
        this.showFormation = response[0];
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

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'name', 'contains');
    console.log(elemento2);
  }

  constructor(private formationsService:FormationService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef){}


  formations:UserFormationDTO[] = [];
  selectedFormation!:UserFormationDTO;
  showFormation!:UserFormationDTO;
  supports:NinjaUserFormationDTO[] = [];
  assaulters:NinjaUserFormationDTO[] = [];
  vanguards:NinjaUserFormationDTO[] = [];
 // formationsToCompare:UserFormationDTO [] = [];
  formationsToCompare:FormationElement [] = [];

  /*addToCompare(formation:UserFormationDTO){
    // Verificar si la formación ya existe en el array
    const exists = this.formationsToCompare.some((f) => f.name === formation.name);
    // Si no existe, agregarla al array
    if (!exists) {
      this.formationsToCompare.push(formation);
      this.showSuccess("Formation added to comapre list");
    }
  }*/
  

  addToCompare(formation:UserFormationDTO){
    let mapa:Map<string,string> = new Map<string,string>();
    formation.ninjas.forEach(ninja =>{
      if(ninja.skill){
        mapa.set(ninja.ninja.name,ninja.skill);
      }else{
        mapa.set(ninja.ninja.name,SkillType.Skill);
      }
    });
    console.log(mapa);
    this.formationsService.createFormationByNinjas(mapa).subscribe(
      response =>{
        const exists = this.formationsToCompare.some((f) => f.formationNinjas === response.formationNinjas);
        if(!exists){
          this.formationsToCompare.push(response);
          this.showSuccess("Formation added to comapre list");
        }else{
          this.showError("Cant add formation "+ response.formationNinjas 
          +" because theres is already a formation with that ninjas");
        }
      }
    );
  }

  changeShowFormation(formation:UserFormationDTO,rowIndex:number){
    console.log(formation)
    this.showFormation= formation;
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

  rechargeFormations(cadena:string){
    this.formationsService.getUserFormations().subscribe(
      response =>{
        this.formations = response;
        if(response.length > 0){
          this.changeShowFormation(response[0],1);
        }
      }
    );
  }

  showSuccess(text:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showError(text:string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }

}
