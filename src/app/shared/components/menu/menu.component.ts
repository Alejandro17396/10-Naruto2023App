import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth-service.service';


@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public authService:AuthService,
              public router: Router){}
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
          },
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
      }
  ];
  this.isAdmin();
 // this.logout();


}

  logout1(){
    this.items.push(
      {
        label: 'Pipes personalizados',
        routerLink: '/auth/login'
      });
  }

  isAdmin(){
    //const authService = inject(AuthService);
    //console.log(authService.isAdmin());
    if(this.authService.isAdmin()){
      this.items.push({
        label:'Admin',
        items:[
            {
              label: 'Equipment',
              items: [
                  {
                    label: 'Add new Equipment',
                    routerLink:'/admin/sets/newEquipment'
                  },
                  {
                    label: 'Update Equipment',
                    routerLink:'/admin/sets/updateEquipment'
                  },
              ]
            },
            {
              label: 'Accesories',
              items: [
                  {
                    label: 'Add new accesories',
                    routerLink:'/admin/accesories/newAccesorieSet'
                  },
                  {
                    label: 'Update accesories',
                    routerLink:'/admin/accesories/updateAccesorieSet'
                  },
              ]
            },
            {
              label: 'Ninjas',
              items: [
                  {
                    label: 'Add new Ninja',
                    routerLink:'/admin/ninjas/newNinja'
                  },
                  {
                    label: 'Update Ninja',
                    routerLink:'/admin/ninjas/updateNinja'
                  },
              ]
            },
        ]
      });
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  items!:MenuItem[];
}
