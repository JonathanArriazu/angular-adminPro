import { Component, OnInit } from '@angular/core';
import { SiderbarService } from '../../services/siderbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor( private siderbarService: SiderbarService) { 
    this.menuItems = siderbarService.menu;
    console.log(this.menuItems)
  }

  ngOnInit(): void {
  }

}
