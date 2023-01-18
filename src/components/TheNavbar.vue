<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authentication';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const authenticationStore = useAuthenticationStore();

const isMobileMenuActive = ref(false);

const logout = async () => {
  await authenticationStore.logout();
  router.push('/login');
};

const toggleMobileMenu = () => {
  isMobileMenuActive.value = !isMobileMenuActive.value;
};
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <h1 class="title is-4">{{ t('global.appName') }}</h1>
      </router-link>
      <a
        v-if="authenticationStore.isLoggedIn"
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isMobileMenuActive }"
        aria-label="menu"
        :aria-expanded="isMobileMenuActive"
        @click="toggleMobileMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      v-if="authenticationStore.isLoggedIn"
      class="navbar-menu"
      :class="{ 'is-active': isMobileMenuActive }"
    >
      <div class="navbar-start">
        <router-link to="/" class="navbar-item"> {{ t('home') }} </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button class="button is-light" @click="logout">
              <span class="icon">
                <i class="fa-solid fa-right-from-bracket"></i>
              </span>
              <span>
                {{ t('logOut') }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<i18n lang="json">
{
  "en": {
    "home": "Home",
    "logOut": "Log out"
  }
}
</i18n>
