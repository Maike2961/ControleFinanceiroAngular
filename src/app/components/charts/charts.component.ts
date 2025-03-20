import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FinanceServiceService } from '../../service/finance-service.service';
import { Financias } from '../../interface/interface';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit {

  chartData: any[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Datas';
  showYAxisLabel = true;
  yAxisLabel = 'Valor (R$)'
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }

  constructor(private financeService: FinanceServiceService) { }

  ngOnInit(): void {
    this.financeService.getAllFinancias().subscribe(data => {
      console.log(data)

      // Agrupa os dados por data e soma os preços
      const groupData = this.groupByDate(data);

      // Mapeia os dados para o formato esperado pelo ngx-charts
      this.chartData = Object.keys(groupData).map(date => ({
        name: new Date(date).toLocaleDateString('pt-BR'),
        value: groupData[date] // Soma dos preços
      }));
      console.log(this.chartData)
    }
    )
  }

  private groupByDate(data: Financias[]) {
    return data.reduce((acc, item) => {
      const dateObj = new Date(item.data);
      if (isNaN(dateObj.getTime())) { // Verifica se a data é válida
        console.warn(`Data inválida:`, item.data);
        return acc;
      }
      const date = dateObj.toISOString().split('T')[0]; // Formata a data como YYYY-MM-DD
      if (!acc[date]) {
        acc[date] = 0;
      }
      const preco = Number(item.preco); // Converte o preço para número
      if (!isNaN(preco)) { // Verifica se o preço é um número válido
        acc[date] += preco; // Soma os preços
      } else {
        console.warn(`Valor inválido para a data ${date}:`, item.preco);
      }
      return acc;
    }, {} as { [key: string]: number });
  }

}

