import { Service, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackNotification } from './snack-notification';
import { SnackNotificationType } from './snack-notification.types';

@Service()
export class SnackNotificationService {

	private snackBar = inject(MatSnackBar);

	private open(message: string, type: SnackNotificationType, duration: number = 5000): void {

		this.snackBar.openFromComponent(SnackNotification, {
			data: { message, type, duration },
			duration: duration,
			horizontalPosition: 'center',
			verticalPosition: 'top',
			panelClass: ['snackbar-panel'],
		});
	}

	success(message: string, duration: number = 5000) {
		this.open(message, 'success', duration);
	}

	error(message: string, duration: number = 5000) {
		this.open(message, 'error', duration);
	}

	warning(message: string, duration: number = 5000) {
		this.open(message, 'warning', duration);
	}

	info(message: string, duration: number = 5000) {
		this.open(message, 'info', duration);
	}
}