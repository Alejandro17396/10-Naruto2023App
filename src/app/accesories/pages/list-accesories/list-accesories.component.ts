import { Component, OnInit } from '@angular/core';
import { AccesoriesService } from '../../services/accesories.service';
import { AccesorieSet } from '../../interfaces/accesories.interfaces';

@Component({
  selector: 'app-list-accesories',
  templateUrl: './list-accesories.component.html',
  styleUrls: ['./list-accesories.component.css']
})
export class ListAccesoriesComponent implements OnInit{

  ngOnInit(): void {
    this.accesoriesService.getAccesories().subscribe(
      response =>{
        this.accesories = response.content;
        
      }
    );
  }

  filter(elemento:any,elemento2:any){
    elemento2.filter(elemento.target.value,'nombre', 'contains');
    console.log(elemento2);
  }

  showAccesorieSetStats(index:number,table:string){
    
  }

  addAccesorieSetToCompare(index:number){
  
  }

  accesories:AccesorieSet[] = [];
  rechargeAccesoriesSetList:boolean = true;
  selectedAccesorie!:AccesorieSet;

  constructor(private accesoriesService: AccesoriesService){}

}
