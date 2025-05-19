import { Component, OnInit } from '@angular/core';
import { FinanceServiceService } from '../../service/finance.service';
import { Financias } from '../../interface/interface';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart-pizza',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './chart-pizza.component.html',
  styleUrl: './chart-pizza.component.scss'
})
export class ChartPizzaComponent implements OnInit {

  pieChartData: any[] = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };

  constructor(private serviceFinancia: FinanceServiceService) { }


  ngOnInit(): void {
    this.serviceFinancia.getAllFinancias().subscribe(dados => {

      const totais = this.calcularTotais(dados);
      this.pieChartData = [
        { name: 'Pago', value: totais.pago },
        { name: 'A Pagar', value: totais.aPagar }
      ];
    },
      error => {
        console.error("Erro ao carregar: ", error)
      }
    )
  }


  private calcularTotais(data: Financias[]): { pago: number, aPagar: number } {
    return data.reduce((acc, item) => {
      const preco = Number(item.preco)
      if (item.isPago.toLocaleLowerCase() === 'sim') {
        acc.pago += preco
      } else {
        acc.aPagar += preco
      }
      return acc;
    }, { pago: 0, aPagar: 0 });
  }

  formatTooltip(item: any): string {
    return `R$ ${item.value.toFixed(2)}`; // Formata o valor com R$
  }


}
