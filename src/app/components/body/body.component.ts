import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string{
    let style = '';
    if(this.collapsed && this.screenWidth > 768){
      style = 'body-trimed'
    }else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      style = 'body-md-screen'
    }
    return style;
  }
}
