<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authentication';

const authenticationStore = useAuthenticationStore();
</script>
<template>
  {{ authenticationStore.user?.email }}
</template>
