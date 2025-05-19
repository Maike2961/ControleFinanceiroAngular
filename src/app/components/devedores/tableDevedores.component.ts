import { Component, OnInit } from '@angular/core';
import { FinanceServiceService } from '../../service/finance.service';
import { CommonModule } from '@angular/common';
import { Financias } from '../../interface/interface';

@Component({
  selector: 'app-tabala-calote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tableDevedores.component.html',
  styleUrl: './tableDevedores.component.scss'
})
export class TabalaCaloteComponent implements OnInit{
  
  constructor(private service: FinanceServiceService){}

  tabelaCaloteiro: any[] = [];

  ngOnInit(): void {
    this.service.getAllFinancias().subscribe(data => {
        const naoPagos = this.YesOrNot(data)
        this.tabelaCaloteiro = naoPagos.map(item => ({
          categoria: item.categoria,
          descricao: item.descricao,
          preco: Number(item.preco)
        }));
    });
  }


  private YesOrNot(data: Financias[]){
    return data.filter(item => item.isPago === "não")
  }

}
