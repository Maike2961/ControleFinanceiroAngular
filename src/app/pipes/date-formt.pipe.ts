import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormt',
  standalone: true
})
export class DateFormtPipe implements PipeTransform {

  transform(value: string | Date): string {
    if(!value) return '';
    console.log(value)
    const date = typeof value === 'string' ? new Date(value + 'T12:00:00') : new Date(value);
    console.log(date)
    return date.toLocaleDateString('pt-BR', {timeZone: 'America/Sao_Paulo'})
  }

}
