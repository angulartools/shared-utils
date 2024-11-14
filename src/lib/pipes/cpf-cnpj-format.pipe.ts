import { Pipe, PipeTransform } from '@angular/core';
import IMask from 'imask';
import { Mask } from '../mask/mask';

@Pipe({
    name: 'cpfCnpjFormat',
    standalone: true
})
export class CpfCnpjFormat implements PipeTransform {

  maskCnpj = IMask.createMask(Mask.getMaskCnpj());
  maskCpf = IMask.createMask(Mask.getMaskCpf());

  transform(value: string) {
    if (value.length === 11) {
      this.maskCpf.resolve(value);
      return this.maskCpf.value;
    } else if (value.length === 14) {
      this.maskCnpj.resolve(value);
      return this.maskCnpj.value;
    }
    return '';
  }
}
