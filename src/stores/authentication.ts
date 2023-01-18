import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types/User';
import AuthenticationService from '@/services/AuthenticationService';
import AuthenticationManager from '@/utils/AuthenticationManager';
import type { LoginRequest } from '@/types/Authentication';

export const useAuthenticationStore = defineStore('authentication', () => {
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('currentUser') as string)
  );

  async function login(data: LoginRequest) {
    await AuthenticationManager.login(data);
    const currentUser = await AuthenticationService.getCurrentUser();
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    user.value = currentUser;
  }

  async function logout() {
    await AuthenticationManager.logout();
    localStorage.removeItem('currentUser');
    user.value = null;
  }

  const isLoggedIn = computed(() => !!user.value);

  return { user, isLoggedIn, login, logout };
});
