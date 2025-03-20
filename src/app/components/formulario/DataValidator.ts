import { AbstractControl, ValidatorFn } from "@angular/forms";

export function DataMinima(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

        const dataSelect = new Date(control.value + 'T00:00:00')
        const dataAtual = new Date()
        const dataMinima = new Date()
        dataMinima.setFullYear(dataMinima.getFullYear() - 2);

        dataSelect.setHours(0, 0, 0, 0);
        dataMinima.setHours(0, 0, 0, 0);
        dataAtual.setHours(0, 0, 0, 0)

        if (dataSelect < dataMinima) {
            return { 'dataMinimaInvalida': true }
        }

        if (dataSelect > dataAtual) {
            return { 'dataFuturaInvalida': true };
        }
        return null;
    }
}