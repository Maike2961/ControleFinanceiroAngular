import { Component, OnInit } from '@angular/core';
import { widgetContainers } from './widgetContainer';
import { CommonModule } from '@angular/common';
import { FinanceServiceService } from '../../service/finance.service';
import { noop } from 'rxjs';

@Component({
  selector: 'app-topwidget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topwidget.component.html',
  styleUrl: './topwidget.component.scss'
})
export class TopwidgetComponent implements OnInit{

  navWidget = widgetContainers

  constructor(private service: FinanceServiceService){}


  categorias = ['carro', 'fastfood', 'mercado', 'pizza', 'pessoa', 'comprinhas', 'entreterimento']

  totaisCategoria: {[key: string] : number} = {};

  novoWidget: any = [];
  
  ngOnInit(): void {
    this.service.getAllFinancias().subscribe(data =>{

      //inicializado o array
      this.categorias.forEach(categoria => {
        this.totaisCategoria[categoria] = 0;
      })
      
      data.forEach(financia => {

        const categoria = financia.categoria.toString().toLowerCase();
        const preco = Number(financia.preco);


        if(this.categorias.includes(categoria)){
          this.totaisCategoria[categoria] += preco
        }
      });

      this.novoWidget = this.navWidget.map(novo => {

        const total =  this.totaisCategoria[novo.label.toLowerCase()] || 0;
        return {
          ...novo,
          total: total
        }
      })

      console.log('novo widget',this.novoWidget);
    })
  }


}
