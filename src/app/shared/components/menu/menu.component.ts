import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit {
  ngOnInit(): void {
    this.items = [
      {
        label: 'Sets',
        items: [
          {
            label: 'Search sets',
            routerLink:'/sets/search'
          },
          {
            label: 'Compare sets',
            routerLink:'/sets/setsComparator'
          },
          {
            label:'View own sets',
            routerLink:'/sets/viewOwnSets'
          },
          {
            label:'Create own sets',
            routerLink:'/sets/createOwnSets'
          }
        ]
      },
      { 
        label: 'Accesoriess',
        items: [
          {
            label: 'Accesories list',
            routerLink:'/accesories/list'
          },
          {
            label: 'Compare accesories',
            routerLink:'/accesories/accesoriesComparator'
          },
          {
            label:'View own accesories combo',
            routerLink:'/accesories/viewOwnAccesories'
          },
          {
            label:'Create own accesories combo',
            routerLink:'/accesories/createOwnAccesories'
          }
        ]
      },
      {
        label: 'Pipes personalizados',
        routerLink: 'ordenar'
      }
  ];
}

items!:MenuItem[];
}
