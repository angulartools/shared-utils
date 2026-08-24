export type SnackNotificationType =
	| 'success'
	| 'error'
	| 'warning'
	| 'info';

export interface SnackNotificationData {
	message: string;
	type: SnackNotificationType;
	duration: number;
}