import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { FinanceServiceService } from '../../service/finance.service';
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
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Valor (R$)'
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }

  constructor(private financeService: FinanceServiceService) { }

  ngOnInit(): void {
    this.financeService.getAllFinancias().subscribe(data => {
      console.log(data)

      // Agrupa os dados por mes e soma os preços
      const groupData = this.groupByDate(data);

      // Mapeia os dados para o formato esperado pelo ngx-charts
      this.chartData = Object.keys(groupData).map(date => {

        const [year, month] = date.split("-")

        const newdate = new Date(parseInt(year), parseInt(month), - 1, 1)
        return {
          name: newdate.toLocaleDateString("pt-BR", {month: "short", year: "numeric"}),

          value: groupData[date] //acessando o valor associado à chave
        }
      });
    }
    )
  }

  private groupByDate(data: Financias[]) {
    return data.reduce((acc, item) => {

      const dateObj = new Date(item.data);
      const month = dateObj.toISOString().slice(0, 7) // Formata a data como YYYY-MM
      const preco = Number(item.preco)

      console.log("Mes", month)

      if (!acc[month]) {
        acc[month] = 0;
      }

      if (!isNaN(preco)) {
        acc[month] += preco
      }

      return acc;
    }, {} as { [key: string]: number });
  }

  formatNumber(value: any): string{
    return `R$ ${value.toFixed(2)}`
  }
}

