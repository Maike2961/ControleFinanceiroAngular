import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SideNavToggle } from './interface/interface';
import { BodyComponent } from "./components/body/body.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';

  isSideNavCollapsed = false
  screenWidth = 0;

  onToggleSideEvent(data: SideNavToggle){
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
