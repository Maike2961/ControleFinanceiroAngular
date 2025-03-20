import { Component } from '@angular/core';
import { widgetContainers } from '../dashboard/widgetContainer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topwidget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topwidget.component.html',
  styleUrl: './topwidget.component.scss'
})
export class TopwidgetComponent {

  navWidget = widgetContainers
}
