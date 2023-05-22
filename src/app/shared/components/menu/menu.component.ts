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
        label: 'Accesories',
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
        label: 'Ninjas',
        items: [
          {
            label: 'Ninjas list',
            routerLink:'/ninjas/list'
          },
          {
            label: 'Compare ninjas',
            routerLink:'/ninjas/NinjasComparator'
          },
          {
            label:'View own accesories combo',
            routerLink:'/ninjas/viewOwnNinjas'
          },
          {
            label:'Create own accesories combo',
            routerLink:'/ninjas/createOwnNinjas'
          }
        ]
      },
      {
        label: 'Pipes personalizados',
        routerLink: '/auth/login'
      }
  ];
}

items!:MenuItem[];
}
