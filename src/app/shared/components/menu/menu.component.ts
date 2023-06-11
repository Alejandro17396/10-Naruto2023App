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
            routerLink:'/ninjas/ninjasComparator'
          },
          {
            label:'View own ninja combo',
            routerLink:'/ninjas/viewOwnNinjas'
          },
          {
            label:'Create own ninja combo',
            routerLink:'/ninjas/createOwnNinjas'
          },
          {
            label:'Comapre your ninjas',
            routerLink:'/ninjas/userNinjasComparator'
          }
        ]
      },
      { 
        label: 'Formations',
        items: [
          {
            label: 'Generate formations',
            routerLink:'/formations/generateFormations'
          },
          {
            label: 'Compare ninjas',
            routerLink:'/formations/FormationsComparator'
          },
          {
            label:'View own formations',
            routerLink:'/formations/viewOwnFormations'
          },
          {
            label:'Create own formations',
            routerLink:'/formations/createOwnFormations'
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
