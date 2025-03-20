import { Component } from '@angular/core';
import {TopwidgetComponent} from '../topwidget/topwidget.component'
import { widgetContainers } from './widgetContainer';
import { ChartsComponent } from "../charts/charts.component";
import { ChartPizzaComponent } from "../chart-pizza/chart-pizza.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopwidgetComponent, ChartsComponent, ChartPizzaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
