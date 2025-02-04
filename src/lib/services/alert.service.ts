import { SweetAlertOptions } from 'sweetalert2';
import Swal from 'sweetalert2';
import { inject, Injectable } from '@angular/core';
import { TranslationService } from '@angulartoolsdr/translation';

@Injectable({providedIn: 'root'})
export class AlertService {

  translate = inject(TranslationService);

  alertText(title: string, message: any, fnConfirm?: any, fnCancel?: any) {

    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#0CC27E',
      confirmButtonText: '<i class="ft-check-circle"></i> ' + this.translate.instant('OK')
    }).then((result) => {
      if (result.value) {
        fnConfirm();
      } else if (fnCancel !== undefined) {
        fnCancel();
      }
    });
  }


  confirmText(title: string, message: any, fnConfirm?: any, fnCancel?: any) {
    let mensagem = '';
    let params = {};
    if (message instanceof Array) {
      mensagem = message[0];
      params = message[1];
    } else {
      mensagem = message;
    }

    Swal.fire({
      title: title,
      text: mensagem,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '<i class="ft-check-circle"></i> ' + this.translate.instant('SIM'),
      cancelButtonText: '<i class="ft-x-circle"></i> ' + this.translate.instant('NAO'),
    }).then((result) => {
      if (result.value) {
        fnConfirm();
      } else if (fnCancel !== undefined) {
        fnCancel();
      }
    });
  }

  confirmTextResetPassword(fnConfirm?: any, fnCancel?: any) {

    const swal: SweetAlertOptions = {
      title: this.translate.instant('RESETAR_SENHA'),
      text: this.translate.instant('DIGITE_CODIGO_AUTENTICACAO'),
      icon: 'info',
      input: 'text',
      inputValidator: (value) => {
        return !value && this.translate.instant('CAMPO_OBRIGATORIO')
      },
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      cancelButtonText: '<i class="ft-x"></i> ' + this.translate.instant('CANCELAR'),
      confirmButtonText: '<i class="ft-check"></i> ' + this.translate.instant('OK'),
    };

    Swal.fire(swal).then((result) => {
      if (result.value) {
        fnConfirm(result.value);
      } else if (fnCancel !== undefined) {
        fnCancel();
      }
    });
  }

}
