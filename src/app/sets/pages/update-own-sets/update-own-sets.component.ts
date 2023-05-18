import { Component, OnInit } from '@angular/core';
import { SetsService } from '../../services/sets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserSetDTOResponse } from '../../interfaces/set.interfaces';

@Component({
  selector: 'app-update-own-sets',
  templateUrl: './update-own-sets.component.html',
  styleUrls: ['./update-own-sets.component.css']
})
export class UpdateOwnSetsComponent implements OnInit{

  constructor(private setservice:SetsService,
              private activatedRoute:ActivatedRoute,
              private router:Router){}

  public set?: UserSetDTOResponse;

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({name}) => this.setservice.getUserSet(name)),
    ).subscribe(set =>{
      if(!set) return this.router.navigate(['/sets/search']);
      console.log({set});
      return ;
    })
  }
}
