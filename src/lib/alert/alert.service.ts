import { inject, Service } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alert, AlertData } from './alert';
import { TranslationService } from '@angulartoolsdr/translation';
import { take } from 'rxjs';

@Service()
export class AlertService {

  private readonly dialog = inject(MatDialog);
  private readonly translate = inject(TranslationService);

  alertText(
    title: string,
    message: any,
    fnConfirm?: () => void,
    fnCancel?: () => void,
    options?: Partial<AlertData>
  ) {
    const mensagem = Array.isArray(message) ? message[0] : message;

    const dialogRef = this.dialog.open(Alert, {
      width: '460px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title,
        message: mensagem,
        type: options?.type ?? 'info',
        confirmText: options?.confirmText ?? this.translate.instant('OK'),
        cancelText: options?.cancelText ?? this.translate.instant('CANCELAR'),
        showCancel: options?.showCancel ?? false,
        placeholder: options?.placeholder,
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

  confirmText(
    title: string,
    message: any,
    fnConfirm?: () => void,
    fnCancel?: () => void,
    options?: Partial<AlertData>
  ) {
    const mensagem = Array.isArray(message) ? message[0] : message;

    const dialogRef = this.dialog.open(Alert, {
      width: '460px',
      maxWidth: '95vw',
      autoFocus: false,
      data: {
        title,
        message: mensagem,
        type: options?.type ?? 'confirm',
        confirmText: options?.confirmText ?? this.translate.instant('SIM'),
        cancelText: options?.cancelText ?? this.translate.instant('NAO'),
        showCancel: options?.showCancel ?? true,
        placeholder: options?.placeholder,
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
