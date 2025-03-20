import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormt',
  standalone: true
})
export class DateFormtPipe implements PipeTransform {

  transform(value: string | Date, format: string = 'dd/MM/yyyy'): string {
    if(!value) return '';
    const date = typeof value === 'string' ? new Date(value + 'T12:00:00') : new Date(value);
    return date.toLocaleDateString('pt-BR', {timeZone: 'America/Sao_Paulo'})
  }

}
