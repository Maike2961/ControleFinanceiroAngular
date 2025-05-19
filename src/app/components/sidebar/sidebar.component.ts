import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { navbarData } from './navData';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  
  sidebatData = navbarData;
  collapsed: boolean = false;
  screenWidth: number = 0;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  getBody(): string {
    let style = '';
    if(this.collapsed && this.screenWidth > 768){
      style = 'body-trimed'
    }else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      style = 'body-md-screen'
    }
    return style;
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed;
  }

  closeCollapse(){
    this.collapsed = false;
  }

  
  
}
