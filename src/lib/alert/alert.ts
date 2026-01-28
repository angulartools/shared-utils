import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm' | 'input';

@Component({
  selector: 'lib-alert',
  imports: [MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Alert {

  readonly dialogRef = inject(MatDialogRef<Alert>);

  readonly data = inject(MAT_DIALOG_DATA);

  readonly title = signal(this.data.title ?? '');
  readonly message = signal(this.data.message ?? '');
  readonly type = signal<AlertType>(this.data.type ?? 'info');

  readonly confirmText = signal(this.data.confirmText ?? 'OK');
  readonly cancelText = signal(this.data.cancelText ?? 'OK');
  readonly placeholder = signal(this.data.placeholder ?? '');

  inputValue: string = '';

  isConfirm = computed(() => this.type() === 'confirm');
  isInput = computed(() => this.type() === 'input');

  iconClass(): string {
    switch (this.type()) {
      case 'success': return 'fa-solid fa-circle-check text-success';
      case 'error': return 'fa-solid fa-circle-xmark text-error';
      case 'warning': return 'fa-solid fa-triangle-exclamation text-warning';
      case 'info': return 'fa-light fa-circle-check text-success';
      case 'confirm': return 'fa-light fa-circle-question text-info';
      case 'input': return 'fa-light fa-pen-to-square text-confirm';
      default: return '';
    }
  }

  confirm() {
    this.dialogRef.close(this.isInput() ? this.inputValue : true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
