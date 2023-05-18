import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Attribute, BonusAttribute, Product } from 'src/app/shared/interfaces/attributes.interface,';
import { AttributesService } from 'src/app/shared/services/attributes.service';
import { OrderList } from 'primeng/orderlist';
import { ViewChild } from '@angular/core';
import { Filters,Set } from '../../interfaces/set.interfaces';
import { Checkbox } from 'primeng/checkbox';
import { SetsService } from '../../services/sets.service';


@Component({
  selector: 'app-filter-set-panel',
  templateUrl: './filter-set-panel.component.html',
  styleUrls: ['./filter-set-panel.component.css']
})
export class FilterSetPanelComponent implements OnInit{

  @ViewChild('orderList') orderList!: OrderList;

  @ViewChild('order', { static: false }) orderCheckbox!: Checkbox;
  @ViewChild('filter', { static: false }) filterCheckbox!: Checkbox;

  attributeValue: number = 10;

  displayOrderList:boolean = true;

  attributes:Attribute[]=[];

  attributesFilterList:BonusAttribute[]=[];

  filter!:Filters;

  selectedAttribute:Attribute = new Attribute('');

  selectedAttributeFilter:BonusAttribute = new BonusAttribute('',0);

  selectedAttributeFilter2:BonusAttribute[] = [];

  dataSet:boolean = false;

  setsNames:string[]=[];

  sets:Set[] =[];

  selectedSet:Set = new Set();

  setFilter:Set = new Set();

  constructor(public config: DynamicDialogConfig,
              public ref: DynamicDialogRef,
              private attributeServices:AttributesService,
              private cd: ChangeDetectorRef,
              private setService:SetsService) {}

    deleteAttribute(){
        if (this.selectedAttributeFilter2[0]) {
            const index = this.attributesFilterList.indexOf(this.selectedAttributeFilter2[0]);
            if (index !== -1) {
              this.attributesFilterList.splice(index, 1);
            }
            this.selectedAttributeFilter2 = [];
            this.displayOrderList = false;
            setTimeout(() => {
            this.displayOrderList = true;
            }, 0);
        }
    }



    addAttribute(){
      if(this.selectedAttribute?.nombre && this.attributeValue>=0){
        let newAttribute = {
          name: this.selectedAttribute.nombre,
          value: this.attributeValue
        };
        
        let duplicateAttributeIndex = this.attributesFilterList.findIndex(
          attribute => attribute.name === newAttribute.name
        );
        
        if (duplicateAttributeIndex !== -1) {
          this.attributesFilterList[duplicateAttributeIndex].value = newAttribute.value;
        }else{ 
          this.attributesFilterList.push(newAttribute);
        }
        this.displayOrderList = false;
        setTimeout(() => {
          this.displayOrderList = true;
        }, 0);
      }
    }


  ngOnInit(): void {
    this.attributeServices.getAttributes().subscribe(
      response => {
        this.attributes=response;
      }
    );

    this.setService.getSets().subscribe(
      response =>{
          response.content.forEach( set =>{
            this.setsNames.push(set.nombre);
          });
          this.sets = response.content;
      }
    );

     // this.ref.close({ childData: this.attributesFilterList });
    this.attributesFilterList = this.config.data.attributesFilterList;
    this.filter = this.config.data.filters;
    this.setFilter = this.config.data.setFilter;
  }

  saveFilters(){

    this.filter.filter = this.filterCheckbox?.checked();
    this.filter.order = this.orderCheckbox?.checked();
    this.filter.set = this.selectedSet.nombre;
    this.ref.close();
    
  }


}
