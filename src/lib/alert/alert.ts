import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm' | 'input';

export interface AlertData {
  title?: string;
  message?: string | string[];
  type?: AlertType;
  confirmText?: string;
  cancelText?: string;
  placeholder?: string;
  showCancel?: boolean;
}

@Component({
  selector: 'lib-alert',
  imports: [MatDialogContent, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Alert {

  readonly dialogRef = inject(MatDialogRef<Alert>);
  readonly data = inject<AlertData>(MAT_DIALOG_DATA);
  readonly title = signal(this.data.title ?? '');
  readonly message = signal(
    Array.isArray(this.data.message) ? (this.data.message[0] ?? '') : (this.data.message ?? '')
  );
  readonly type = signal<AlertType>(this.data.type ?? 'info');
  readonly confirmText = signal(this.data.confirmText ?? 'OK');
  readonly cancelText = signal(this.data.cancelText ?? 'CANCELAR');
  readonly placeholder = signal(this.data.placeholder ?? '');
  inputValue = signal('');

  readonly isConfirm = computed(() => this.type() === 'confirm');
  readonly isInput = computed(() => this.type() === 'input');
  readonly hasCancel = computed(() =>
    this.data.showCancel !== undefined
      ? this.data.showCancel
      : this.isConfirm() || this.isInput()
  );

  readonly iconClass = computed(() => {
    switch (this.type()) {
      case 'success':
        return 'fa-solid fa-circle-check';
      case 'error':
        return 'fa-solid fa-circle-xmark';
      case 'warning':
        return 'fa-solid fa-triangle-exclamation';
      case 'info':
        return 'fa-solid fa-circle-info';
      case 'confirm':
        return 'fa-solid fa-circle-question';
      case 'input':
        return 'fa-solid fa-pen-to-square';
      default:
        return 'fa-solid fa-circle-info';
    }
  });

  confirm() {
    this.dialogRef.close(
      this.isInput() ? this.inputValue() : true
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
