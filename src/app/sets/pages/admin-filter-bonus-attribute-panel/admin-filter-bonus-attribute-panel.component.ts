import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AttributesService } from 'src/app/shared/services/attributes.service';
import { SetsService } from '../../services/sets.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/auth/services/validators.service';
import { Action, Condition,Attribute as NinjaAttribute, Ninja, Target, WrapEnumsDropdown, BattleActions } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { Attribute as GeneralAttribute} from 'src/app/shared/interfaces/attributes.interface,';
import { Filters } from '../../interfaces/set.interfaces';
import { AutoComplete } from 'primeng/autocomplete';
import { DomHandler } from 'primeng/dom';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-admin-filter-bonus-attribute-panel',
  templateUrl: './admin-filter-bonus-attribute-panel.component.html',
  styleUrls: ['./admin-filter-bonus-attribute-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminFilterBonusAttributePanelComponent implements OnInit,AfterViewInit{

  ngOnInit(): void {
  
    console.log(this.selectedTarget);
    Object.values(Target).forEach(
      element =>{
        this.targetsOptions.push({value:element});
      }
    );
    Object.values(Action).forEach(
      element =>{
        this.actionsOptions.push({value:element});
      }
    );
    Object.values(Condition).forEach(
      element =>{
        this.conditionOptions.push({value:element});
      }
    );
    Object.values(BattleActions).forEach(
      element =>{
        this.timeOptions.push({value:element});
      }
    );
    this.attributeServices.getAttributes().subscribe(
      response =>{
        this.attributes = response;
      }
    );

    this.levelOptions.push({value:"1ri"});
    this.levelOptions.push({value:"2ri"});
    this.levelOptions.push({value:"3ri"});
    

   
    this.attributesFilterList = this.config.data.attributesFilterList;
    
    this.filter = this.config.data.filters;
    this.rechargeNinjasList = false;
    this.ninjas = this.config.data.ninjas;
    this.ninjaFilter = this.config.data.ninja;
    if(this.config.data.level){
      this.level = this.config.data.level;
    }
    //console.log(this.ninjas)
    setTimeout(() => {
    this.rechargeNinjasList = true;
    }, 0);
  }

  level:boolean = false;

  targetsOptions:WrapEnumsDropdown[] = [];//Object.values(Target);
  filteredTargetsOptions:WrapEnumsDropdown[] = [];//Object.values(Target);
  selectedTarget!:WrapEnumsDropdown;// = {value:Target.AllAllies};

  actionsOptions:WrapEnumsDropdown[] = [];
  filteredActionsOptions:WrapEnumsDropdown[] = [];
  selectedAction!:WrapEnumsDropdown;

  conditionOptions:WrapEnumsDropdown[] = [];
  filteredConditionOptions:WrapEnumsDropdown[] = [];
  selectedCondition!:WrapEnumsDropdown;

  timeOptions:WrapEnumsDropdown[] =  [];
  filteredTimeOptions:WrapEnumsDropdown[] =  [];
  selectedTime!:WrapEnumsDropdown;

  levelOptions:WrapEnumsDropdown[]=[];
  filteredLevelOptions:WrapEnumsDropdown[]=[];
  selectedLevel:WrapEnumsDropdown={value:""};

  attributes:GeneralAttribute [] = [];
  filteredAttributes:GeneralAttribute [] = [];
  selectedAttribute:GeneralAttribute = new GeneralAttribute("");



  attributeValue:number = 0;
  rechargeNinjasList:boolean = true;
  attributesFilterList:NinjaAttribute [] = [];
  selectedAttributeFilter:NinjaAttribute [] = [];
  filterNinjas:boolean = false;
  filter!:Filters;
  ninjas:Ninja[] = [];
  ninjaFilter!:Ninja;
  selectedNinja!:Ninja;

  public myForm: FormGroup = this.fb.group({
    selectedTarget: ['', [ Validators.required]],
    selectedAction: ['', [ Validators.required]],
    selectedCondition: ['', [ Validators.required]],
    selectedAttribute: ['', [ Validators.required]],
    selectedTime: ['', [ Validators.required]],
    attributeValue: ['', ],

  });

  onSubmit(){

      if(this.myForm.valid){
       this.addFilter();
      }

  }

  deleteAttribute(){
    if(this.selectedAttributeFilter.length > 0){
      const index = this.attributesFilterList.indexOf(this.selectedAttributeFilter[0]);
      if (index !== -1) {
        this.attributesFilterList.splice(index, 1);
      }
      this.selectedAttributeFilter = [];
      this.rechargeNinjasList = false;
      setTimeout(() => {
      this.rechargeNinjasList = true;
      }, 0);
    }
  }

  addFilter(){
    let ninjaAttribute :NinjaAttribute = new NinjaAttribute();
    let value = this.myForm.controls['selectedTarget'].value;
      if(value){
        ninjaAttribute.impact = value.value;
      }
    value = this.myForm.controls['selectedAction'].value; 
      if(value){
        ninjaAttribute.action = value.value;
      }
    value = this.myForm.controls['selectedCondition'].value; 
      if(value){
        ninjaAttribute.condition = value.value;
      }
    value = this.myForm.controls['selectedAttribute'].value; 
      if(value){
        ninjaAttribute.attributeName = value.nombre;
      }
    value = this.myForm.controls['attributeValue'].value | 0; 
      if(value){
        ninjaAttribute.value = value;
      }
      value = this.myForm.controls['selectedTime'].value; 
      if(value){
        console.log(value)
        ninjaAttribute.time = value.value;
      }
      if(this.level){
        console.log("El valor es " +this.selectedLevel.value)
        console.log(this.selectedLevel.value)
        if(this.selectedLevel.value){
          ninjaAttribute.level = this.selectedLevel.value;
        }else{
          ninjaAttribute.level = "1ri";
        }
      }

      console.log(ninjaAttribute);
    
    const existingIndex = this.attributesFilterList.findIndex((item) => JSON.stringify(this.omitValue(item)) === JSON.stringify(this.omitValue(ninjaAttribute)));
    if (existingIndex !== -1) {
      this.attributesFilterList.splice(existingIndex,1);
    }
    console.log(existingIndex);
    this.attributesFilterList.push(ninjaAttribute);
    this.rechargeNinjasList = false;
    setTimeout(() => {
    this.rechargeNinjasList = true;
    }, 0);

  }

  omitValue(obj: NinjaAttribute){
    const { value,time, color, ...rest } = obj;
    return rest;
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  saveFilters(){
    if(this.selectedNinja){
      this.ninjaFilter = this.selectedNinja;
    }

    this.ref.close();
  }

  


  filterTarget(event: AutoCompleteCompleteEvent) {
      let filtered: WrapEnumsDropdown[] = [];
      let query = event.query;

      for (let i = 0; i < this.targetsOptions.length; i++) {
          let target = this.targetsOptions[i];
          if (target.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(target);
          }
      }

      this.filteredTargetsOptions = filtered;
  }

  filterActions(event: AutoCompleteCompleteEvent) {
    let filtered: WrapEnumsDropdown[] = [];
    let query = event.query;

    for (let i = 0; i < this.actionsOptions.length; i++) {
        let target = this.actionsOptions[i];
        if (target.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(target);
        }
    }

    this.filteredActionsOptions = filtered;
  }

  filterCondition(event: AutoCompleteCompleteEvent) {
    let filtered: WrapEnumsDropdown[] = [];
    let query = event.query;

    for (let i = 0; i < this.conditionOptions.length; i++) {
        let target = this.conditionOptions[i];
        if (target.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(target);
        }
    }

    this.filteredConditionOptions = filtered;
  }

  filterTime(event: AutoCompleteCompleteEvent) {
    let filtered: WrapEnumsDropdown[] = [];
    let query = event.query;

    for (let i = 0; i < this.timeOptions.length; i++) {
        let target = this.timeOptions[i];
        if (target.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(target);
        }
    }

    this.filteredTimeOptions = filtered;
  }

  filterLevel(event: AutoCompleteCompleteEvent) {
    let filtered: WrapEnumsDropdown[] = [];
    let query = event.query;

    for (let i = 0; i < this.levelOptions.length; i++) {
        let target = this.levelOptions[i];
        if (target.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(target);
        }
    }

    this.filteredLevelOptions = filtered;
  }

  filterAttributes(event: AutoCompleteCompleteEvent) {
    let filtered: GeneralAttribute[] = [];
    let query = event.query;

    for (let i = 0; i < this.attributes.length; i++) {
        let target = this.attributes[i];
        if (target.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(target);
        }
    }

    this.filteredAttributes = filtered;
  }

  @ViewChild('AttributesAutocomplete') autoComplete!: AutoComplete;

  ngAfterViewInit() {
    if (this.autoComplete) {
      this.autoComplete.onDropdownClick.subscribe(() => {
        setTimeout(() => {
          this.adjustDropdownWidth();
        });
      });
    }
  }

adjustDropdownWidth() {
  const panel = document.querySelector('.p-autocomplete-panel') as HTMLElement;
  if (panel) {
    const autoCompleteWidth = this.autoComplete.el.nativeElement.clientWidth;
    panel.style.width = autoCompleteWidth + 'px';
  }
}


  
  

  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private attributeServices:AttributesService,
    private cd: ChangeDetectorRef,
    private setService:SetsService,
    private fb:FormBuilder,
    private validatorsService: ValidatorsService,
    private renderer: Renderer2, 
    private el: ElementRef) {}
}