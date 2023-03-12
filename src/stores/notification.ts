import { ref } from 'vue';
import { defineStore } from 'pinia';
import { type Notification, NotificationType } from '@/types/Notification';

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([]);

  const display = (
    text: string,
    type: NotificationType = NotificationType.Info,
    timeout: number = 2000
  ) => {
    const notification: Notification = { id: Date.now(), text, type, timeout };
    notifications.value.push(notification);

    setTimeout(() => remove(notification.id), notification.timeout);
  };

  const remove = (id: number) => {
    notifications.value = notifications.value.filter((notification) => {
      return notification.id !== id;
    });
  };

  return { notifications, display, remove };
});
