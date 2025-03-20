import { Component } from '@angular/core';
import {TopwidgetComponent} from '../topwidget/topwidget.component'
import { widgetContainers } from '../topwidget/widgetContainer';
import { ChartsComponent } from "../gastosMensais/charts.component";
import { ChartPizzaComponent } from "../chart-pizza/chart-pizza.component";
import { TabalaCaloteComponent } from "../devedores/tabala-calote.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopwidgetComponent, ChartsComponent, ChartPizzaComponent, TabalaCaloteComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
