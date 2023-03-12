export enum NotificationType {
  Info,
  Success,
  Danger,
}

export interface Notification {
  id: number;
  text: string;
  type: NotificationType;
  timeout: number;
}
