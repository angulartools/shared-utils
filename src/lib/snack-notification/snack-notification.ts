import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ChangeDetectionStrategy } from '@angular/core';
import { SnackNotificationData } from './snack-notification.types';

@Component({
	selector: 'lib-snack-notification',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './snack-notification.html',
	styleUrls: ['./snack-notification.scss']
})
export class SnackNotification {
	readonly data = inject<SnackNotificationData>(MAT_SNACK_BAR_DATA);
}