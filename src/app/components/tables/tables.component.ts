import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { Financias } from '../../interface/interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FinanceServiceService } from '../../service/finance-service.service';

import { RouterLink } from '@angular/router';
import { DateFormtPipe } from '../../pipes/date-formt.pipe';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterLink, DateFormtPipe],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent implements OnInit{


  constructor(private service: FinanceServiceService){}
  
  displayedColumns: string[] = ['categoria', 'descricao', 'preco', 'data' ,'isPago'];
  dataSource = new MatTableDataSource<Financias>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
      this.service.getAllFinancias().subscribe((data) =>{
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
  }

  
}
