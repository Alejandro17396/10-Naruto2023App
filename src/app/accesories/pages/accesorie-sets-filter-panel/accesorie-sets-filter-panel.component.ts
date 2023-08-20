import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AccesorieSet } from '../../interfaces/accesories.interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AttributesService } from 'src/app/shared/services/attributes.service';
import { AccesoriesService } from '../../services/accesories.service';
import { Table } from 'primeng/table';
import { BonusAttribute } from 'src/app/shared/interfaces/attributes.interface,';
import { WrapEnumsDropdown } from 'src/app/ninjas/interfaces/Ninja.interfaces';
import { IntensityFilter } from 'src/app/sets/interfaces/set.interfaces';

@Component({
  selector: 'app-accesorie-sets-filter-panel',
  templateUrl: './accesorie-sets-filter-panel.component.html',
  styleUrls: ['./accesorie-sets-filter-panel.component.css']
})
export class AccesorieSetsFilterPanelComponent implements OnInit{

  constructor(public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private attributeServices:AttributesService,
    private cd: ChangeDetectorRef,
    private accesorieService: AccesoriesService) {}


    ngOnInit(): void {
      this.accesorieService.getAllAccesories().subscribe(
        response =>{
          this.accesories = response.content;
          this.accesoriesAll = JSON.parse(JSON.stringify(response.content));
          this.accesories.forEach(accesorie =>{
            this.setsNames.push({value:accesorie.nombre});
          });
        }
      );
      this.attributesFilterList = this.config.data.attributesFilterList;
    }

  accesories:AccesorieSet[] = [];
  accesoriesAll:AccesorieSet[] = [];
  selectedAccesorie:AccesorieSet = AccesorieSet.createSetAux();
  accesoriesToUse:AccesorieSet[] = [];
  attributesFilterList:BonusAttribute[]=[];
  filtersToUse:BonusAttribute[]= [];
  intensity:string ="LOW";
  setsNames: WrapEnumsDropdown[]=[];
  selectedInitialSet!: WrapEnumsDropdown;
  selectedFinalSet!: WrapEnumsDropdown;
  filters:IntensityFilter ={
      intensity:"",
      sets:[],
      startSet:"",
      endSet:""
  };

  generateCombos(){
    this.filters.intensity = this.intensity;

    let setNames:string[] = [];
    this.accesoriesToUse.forEach(element =>{
      setNames.push(element.nombre);
    });
    this.filters.sets = setNames;
    this.filters.startSet = this.selectedInitialSet?.value;
    this.filters.endSet = this.selectedFinalSet?.value;

    this.ref.close(this.filters);
  }

  applyFilters(): void {
    
    this.accesories = this.accesoriesAll.filter(accesorie => {
      return this.filtersToUse.every(filter => {
        return accesorie.bonuses.some(bonusGroup => {
          return bonusGroup.bonuses.some(bonus => {
            return filter.name === bonus.nombreAtributo;
          });
        });
      });
    });

    console.log(this.intensity)
  }

  isAttributeFiltered(attribute: BonusAttribute): boolean {
    return this.filtersToUse.includes(attribute);
  }

  addFilter(attribute: BonusAttribute): void {
    // Verifica si el atributo no está ya en el array.
    if (!this.filtersToUse.includes(attribute)) {
      this.filtersToUse.push(attribute);
    }

    this.applyFilters();
    console.log(this.accesories)
    this.cd.detectChanges();
  }

  deleteFilter(attribute: BonusAttribute): void {
    const index = this.filtersToUse.indexOf(attribute);
    
    // Si el atributo está presente en el array, elimínalo.
    if (index !== -1) {
      this.filtersToUse.splice(index, 1);
    }

    this.applyFilters();
    console.log(this.accesories)
    this.cd.detectChanges();
  }

  addAccesorieSetToUse(accesorieSet:AccesorieSet){
    // Verificar si el accesorieSet ya existe en accesoriesToUse basándose en la propiedad nombre
    const exists = this.accesoriesToUse.some(set => set.nombre === accesorieSet.nombre);

    // Si no existe, agregarlo al array
    if (!exists && this.accesoriesToUse.length <=15) {
        this.accesoriesToUse.push(accesorieSet);
    }
    this.cd.detectChanges();
  }

  deleteAccesorieSetToUse(accesorieSet:AccesorieSet){
    this.accesoriesToUse = this.accesoriesToUse.filter(set => set.nombre !== accesorieSet.nombre);
    this.cd.detectChanges();
  }

  @ViewChild('accesoriesTable2') accesoriesTable!: Table;

  filterAccesoriesTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.accesoriesTable.filterGlobal(inputValue, 'contains');
}
}
