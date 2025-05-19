import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { DateFormtPipe } from '../../pipes/date-formt.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FinanceServiceService } from '../../service/finance.service';
import { SharedService } from '../../shared/shared.service';
import { Financias } from '../../interface/interface';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [MatTableModule, 
    MatPaginatorModule, 
    SidebarComponent,
    RouterLink, 
    DateFormtPipe, 
    MatIconModule, 
    MatButtonModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent implements OnInit{
  
    constructor(private service: FinanceServiceService, private shared: SharedService, 
      private router: Router) { }
  
    displayedColumns: string[] = ['categoria', 'descricao', 'preco', 'data', 'isPago', 'actions'];
    dataSource = new MatTableDataSource<Financias>();
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngOnInit(): void {
      this.service.getAllFinancias().subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      })
    }


  
    editTable(dados: Financias) {
      console.log("Edição", dados)
      this.shared.sendItemEdit(dados);
      this.router.navigate(['/form'])
    }
  
    deleteRow(dados: Financias) {
      this.service.deleteFinancias(dados).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((item) => item.id !== dados.id);
      });
    }
  

  
}
