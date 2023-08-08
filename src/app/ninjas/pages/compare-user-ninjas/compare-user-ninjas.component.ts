import { Component, OnInit } from '@angular/core';
import { CompareNinjasUserDTO, NinjaUserFormationDTO } from '../../interfaces/Ninja.interfaces';
import { NinjasService } from '../../services/ninjas-service.service';
import { NinjasSharedDataService } from '../../services/ninjas-shared-data.service';

@Component({
  selector: 'app-compare-user-ninjas',
  templateUrl: './compare-user-ninjas.component.html',
  styleUrls: ['./compare-user-ninjas.component.css']
})
export class CompareUserNinjasComponent implements  OnInit{

  constructor(private ninjasService: NinjasService,
    private ninjasSharedDataService:NinjasSharedDataService){}

  ngOnInit(): void {

    this.ninjasService.getUserNinjas().subscribe(
      response =>{
        this.ninjas = response;
      }
    );

    this.ninjasSharedDataService.setShowNinjaUserLeft = false;
    this.ninjasSharedDataService.setShowNinjaUserRight = false;

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
  }

  ninjas:NinjaUserFormationDTO [] = [];
  responsiveOptions: any[] =[];

  ninjaLeft!:NinjaUserFormationDTO;

  ninjaRight!:NinjaUserFormationDTO;

  ninjaCompareLeft!:NinjaUserFormationDTO;

  ninjaCompareRight!:NinjaUserFormationDTO;

  changeNinjaLeft(ninja:NinjaUserFormationDTO){
    console.log("holaS")
    this.ninjaLeft = JSON.parse(JSON.stringify(ninja));
    console.log(this.ninjas)
    let body : CompareNinjasUserDTO ={
        ninjaLeft:ninja,
        ninjaRight:this.ninjaRight
    }
    this.ninjasService.compareNinjasUser(body).subscribe(
      response =>{
        this.ninjasSharedDataService.setNinjaUserLeft = response.ninjaLeft;
        this.ninjasSharedDataService.setNinjaUserRight = response.ninjaRight;
        this.ninjasSharedDataService.setShowNinjaUserLeft = true;
        console.log("sdkfs,s")
        console.log(response.ninjaLeft)
        console.log(this.ninjaLeft);
        console.log("lasjkasl")
        console.log(response.ninjaRight)
        console.log(this.ninjaRight);
      }
    );
  }

  changeNinjaRight(ninja:NinjaUserFormationDTO){
    this.ninjaRight = JSON.parse(JSON.stringify(ninja));
    let body : CompareNinjasUserDTO ={
        ninjaLeft:this.ninjaLeft,
        ninjaRight:ninja
    }
    this.ninjasService.compareNinjasUser(body).subscribe(
      response =>{
        this.ninjasSharedDataService.setNinjaUserLeft = response.ninjaLeft;
        this.ninjasSharedDataService.setNinjaUserRight = response.ninjaRight;
        this.ninjasSharedDataService.setShowNinjaUserRight = true;
      }
    );
  }
}
