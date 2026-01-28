import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alert } from './alert';
import { TranslationService } from '@angulartoolsdr/translation';

@Injectable({ providedIn: 'root' })
export class AlertService {

  private readonly dialog = inject(MatDialog);
  private readonly translate = inject(TranslationService);

  alertText(title: string, message: any, fnConfirm?: () => void, fnCancel?: () => void) {
    const dialogRef = this.dialog.open(Alert, {
      data: {
        title,
        message,
        type: 'info',
        confirmText: this.translate.instant('OK'),
      },
      panelClass: 'custom-alert-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        fnConfirm?.();
      } else {
        fnCancel?.();
      }
    });
  }

  confirmText(title: string, message: any, fnConfirm?: () => void, fnCancel?: () => void) {
    let mensagem = '';
    if (message instanceof Array) {
      mensagem = message[0]; // tradução já tratada externamente
    } else {
      mensagem = message;
    }

    const dialogRef = this.dialog.open(Alert, {
      data: {
        title,
        message: mensagem,
        type: 'confirm',
        confirmText: this.translate.instant('SIM'),
        cancelText: this.translate.instant('NAO'),
      },
      panelClass: 'custom-alert-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        fnConfirm?.();
      } else {
        fnCancel?.();
      }
    });
  }

  confirmTextResetPassword(fnConfirm?: (value: string) => void, fnCancel?: () => void) {
    const dialogRef = this.dialog.open(Alert, {
      data: {
        title: this.translate.instant('RESETAR_SENHA'),
        message: this.translate.instant('DIGITE_CODIGO_AUTENTICACAO'),
        type: 'input',
        placeholder: this.translate.instant('CODIGO_AUTENTICACAO'),
        confirmText: this.translate.instant('OK'),
        cancelText: this.translate.instant('CANCELAR'),
      },
      panelClass: 'custom-alert-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        fnConfirm?.(result);
      } else {
        fnCancel?.();
      }
    });
  }
}
