import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Teams',
        icon: 'pi pi-users',
        routerLink: '/teams',
      },
      {
        label: 'Players',
        icon: 'pi pi-user',
        routerLink: '/players',
      },
      {
        label: 'Coaches',
        icon: 'pi pi-user-edit',
        routerLink: '/coaches',
      },
    ];
  }
}
