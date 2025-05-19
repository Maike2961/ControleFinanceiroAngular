import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ChartComponent } from '@swimlane/ngx-charts';
import { ChartsComponent } from '../../components/gastosMensais/charts.component';
import { ChartPizzaComponent } from '../../components/chart-pizza/chart-pizza.component';
import { TabalaCaloteComponent } from '../../components/devedores/tableDevedores.component';
import { TopwidgetComponent } from '../../components/topwidget/topwidget.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, ChartsComponent, TopwidgetComponent,
    ChartPizzaComponent, 

    TabalaCaloteComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
