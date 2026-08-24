import { inject, Service } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alert } from './alert';
import { TranslationService } from '@angulartoolsdr/translation';
import { take } from 'rxjs';

@Service()
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

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        fnConfirm?.();
      } else {
        fnCancel?.();
      }
    });
  }

  confirmText(title: string, message: any, fnConfirm?: () => void, fnCancel?: () => void) {

    const mensagem = Array.isArray(message) ? message[0] : message;

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


    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        fnConfirm?.();
      } else {
        fnCancel?.();
      }
    });
  }

}