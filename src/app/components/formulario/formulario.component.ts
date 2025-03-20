import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinanceServiceService } from '../../service/finance-service.service';
import { DataMinima } from './DataValidator';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {

  newForm!: FormGroup

  constructor(private snackBar: MatSnackBar, private service: FinanceServiceService) {
    this.newForm = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
      preco: new FormControl(null, [Validators.required, Validators.min(1)]),
      data: new FormControl('', [Validators.required, DataMinima()]),
      isPago: new FormControl(false, [Validators.required])
    })
  }

  opcoesCategoria = [
    {label: 'Carro', value: 'carro'},
    {label: 'FastFood', value: 'fastfood'},
    {label: 'Pizza', value: 'pizza'},
    {label: 'Mercado', value: 'mercado'},
    {label: 'Pessoa', value: 'pessoa'},
    {label: 'Comprinhas', value: 'comprinhas'},
  ]

  OnSubmit(){
    if(this.newForm.valid){
      
      const formValue = {
        ...this.newForm.value, 
        preco: parseFloat(this.newForm.value.preco).toFixed(2),
        isPago: this.newForm.value.isPago ? "sim" : "não"
      };

      this.service.postFinancias(formValue).subscribe({

        next: (response)=>{
          this.snackBar.open('Formulário enviado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },

        error: (err) => {
          this.snackBar.open('Erro ao enviar Formulário', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },

      })
      this.newForm.reset();
    }
  }
}
