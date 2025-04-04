import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './navData';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SideNavToggle } from '../../interface/interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  
  @Output() onToggleSide: EventEmitter<SideNavToggle> = new EventEmitter();
  
  collapsed = false
  screenWidth = 0;
  sidebarData = navbarData
  
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed
    this.onToggleSide.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(){
    this.collapsed = false
    this.onToggleSide.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
