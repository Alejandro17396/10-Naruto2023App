import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserFormationDTO } from '../../interfaces/formations.interface';
import { Formation, NinjaUserFormationDTO } from 'src/app/ninjas/interfaces/Ninja.interfaces';

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
}
