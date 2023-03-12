<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification';
import { NotificationType } from '@/types/Notification';

const notificationStore = useNotificationStore();
</script>

<template>
  <div class="notification-container">
    <div
      v-for="notification in notificationStore.notifications"
      :key="notification.id"
      class="notification has-text-centered"
      :class="{
        'is-info': notification.type === NotificationType.Info,
        'is-success': notification.type === NotificationType.Success,
        'is-danger': notification.type === NotificationType.Danger,
      }"
    >
      <button
        @click="notificationStore.remove(notification.id)"
        class="delete"
      ></button>
      {{ notification.text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  pointer-events: none;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
