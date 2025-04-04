import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinanceServiceService } from '../../service/finance.service';
import { DataMinima } from './DataValidator';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {

  newForm!: FormGroup
  Edit: boolean = false;
  itemEditId: String | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private service: FinanceServiceService,
    private sharedService: SharedService) {

    this.newForm = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
      preco: new FormControl(null, [Validators.required, Validators.min(1)]),
      data: new FormControl('', [Validators.required, DataMinima()]),
      isPago: new FormControl(false, [Validators.required])
    })
  }

  opcoesCategoria = [
    { label: 'Carro', value: 'carro' },
    { label: 'Entreterimento', value: 'entreterimento' },
    { label: 'FastFood', value: 'fastfood' },
    { label: 'Pizza', value: 'pizza' },
    { label: 'Mercado', value: 'mercado' },
    { label: 'Pessoa', value: 'pessoa' },
    { label: 'Comprinhas', value: 'comprinhas' },
  ]


  ngOnInit(): void {
    this.sharedService.itemEdit$.subscribe((item) => {
      if (item) {
        this.Edit = true;
        this.itemEditId = item.id;
        this.newForm.patchValue(item);
      }
    })
  }

  OnSubmit() {
    if (this.newForm.valid) {

      const formValue = {
        ...this.newForm.value,
        preco: parseFloat(this.newForm.value.preco).toFixed(2),
      };

      if (this.Edit && this.itemEditId !== null) {

        const updateItem = { ...formValue, id: this.itemEditId }

        this.service.putFinancias(updateItem).subscribe(() => {
          this.showSnackBar('Atualizado com sucesso', 'success')
          this.sharedService.cleanItem();
        });

      } else {

        this.service.postFinancias(formValue).subscribe({
          next: () => {
            this.showSnackBar('Adicionado com sucesso', 'success')
          },
          error: () => {
            this.showSnackBar('Erro ao adicionar', 'error')
          },

        })
      }
      this.newForm.reset();
    }
  }


  private showSnackBar(message: string, type: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'sucess' ? ['snack-success'] : ['snack-error']
    })
  }
}
