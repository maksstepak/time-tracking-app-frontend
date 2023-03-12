<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import NotificationContainer from '@/components/NotificationContainer.vue';
</script>

<template>
  <div class="site">
    <TheNavbar />
    <main class="site__content my-3">
      <div class="container">
        <RouterView />
      </div>
    </main>
    <TheFooter />
  </div>
  <NotificationContainer />
</template>
