
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SetsService } from 'src/app/sets/services/sets.service';
import { AttributesService } from 'src/app/shared/services/attributes.service';
import { Action, Attribute as NinjaAttribute, Condition, Target, WrapEnumsDropdown, Ninja } from '../../interfaces/Ninja.interfaces';
import { Attribute as GeneralAttribute} from 'src/app/shared/interfaces/attributes.interface,';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/auth/services/validators.service';
import { Checkbox } from 'primeng/checkbox';
import { Filters } from 'src/app/sets/interfaces/set.interfaces';

@Component({
  selector: 'app-filter-ninja-panel-component',
  templateUrl: './filter-ninja-panel-component.component.html',
  styleUrls: ['./filter-ninja-panel-component.component.css']
})
export class FilterNinjaPanelComponent implements OnInit{

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
    this.attributeServices.getAttributes().subscribe(
      response =>{
        this.attributes = response;
      }
    );
   
    this.attributesFilterList = this.config.data.attributesFilterList;
    /*this.attributesFilterList.push(
      { attributeName:"avoid injury rate",
        action:"decrease",
        impact:"all enemies",
        condition:"ninja is alive",
        value:30 }
    );
    this.attributesFilterList.push(
      { attributeName:"defense",
        action:"increase",
        impact:"all allies",
        condition:"ninja is alive",
        value:30 }
    );
    this.attributesFilterList.push(
      { attributeName:"HP",
        action:"decrease",
        impact:"all enemies",
        condition:"ninja is alive",
        value:30 }
    );*/
    
    
    this.filter = this.config.data.filters;
    this.rechargeNinjasList = false;
    this.ninjas = this.config.data.ninjas;
    this.ninjaFilter = this.config.data.ninja;
    //console.log(this.ninjas)
    setTimeout(() => {
    this.rechargeNinjasList = true;
    }, 0);
  }

  
  targetsOptions:WrapEnumsDropdown[] = [];//Object.values(Target);
  selectedTarget!:WrapEnumsDropdown;// = {value:Target.AllAllies};
  actionsOptions:WrapEnumsDropdown[] = [];
  selectedAction!:WrapEnumsDropdown;
  conditionOptions:WrapEnumsDropdown[] = [];
  selectedCondition!:WrapEnumsDropdown;
  attributes:GeneralAttribute [] = [];
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
  @ViewChild('order', { static: false }) orderCheckbox!: Checkbox;
  @ViewChild('filter', { static: false }) filterCheckbox!: Checkbox;

  public myForm: FormGroup = this.fb.group({
    //name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern )  ]],
    // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ new EmailValidator() ]],
    //email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidator ]],
    selectedTarget: ['', [ Validators.required]],
    selectedAction: ['', [ Validators.required]],
    selectedCondition: ['', []],
    selectedAttribute: ['', [ Validators.required]],
    attributeValue: ['', ],
  });

  onSubmit(){

      if(this.myForm.valid){
       this.addFilter();
       this.filter.filter = this.filterCheckbox?.checked();
       this.filter.order = this.orderCheckbox?.checked();
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

    this.filter.filter = this.filterCheckbox?.checked();
    this.filter.order = this.orderCheckbox?.checked();
    this.ref.close();
  }

  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private attributeServices:AttributesService,
    private cd: ChangeDetectorRef,
    private setService:SetsService,
    private fb:FormBuilder,
    private validatorsService: ValidatorsService) {}

}
