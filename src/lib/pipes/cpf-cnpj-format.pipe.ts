import { Pipe, PipeTransform } from '@angular/core';
import IMask from 'imask';
import { Mask } from '../mask/mask';

@Pipe({
  name: 'cpfCnpjFormat'
})
export class CpfCnpjFormat implements PipeTransform {

  transform(value?: string | number | null): string {

    if (value == null) {
      return '';
    }

    const valor = String(value).replace(/\D/g, '');

    if (!valor) {
      return '';
    }

    if (valor.length === 11) {
      const mask = IMask.createMask(Mask.getMaskCpf());
      mask.resolve(valor);
      return mask.value;
    }

    if (valor.length === 14) {
      const mask = IMask.createMask(Mask.getMaskCnpj());
      mask.resolve(valor);
      return mask.value;
    }

    return valor;

  }

}
