<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authentication';
import type { LoginRequest } from '@/types/Authentication';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import FormTextField from '@/components/FormTextField.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref, watch } from 'vue';

const { t } = useI18n();
const router = useRouter();
const authenticationStore = useAuthenticationStore();

const schema = yup.object({
  email: yup.string().required().email().label(t('email')),
  password: yup.string().required().label(t('password')),
});

const { handleSubmit, isSubmitting, values } = useForm<LoginRequest>({
  validationSchema: schema,
});

const errorMessage = ref<string | null>(null);

watch(values, () => {
  if (errorMessage.value) {
    errorMessage.value = null;
  }
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await authenticationStore.login(values);
    router.push('/');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.data.errors) {
        actions.setErrors(error.response.data.errors);
      } else if (error.response.data.error) {
        errorMessage.value = error.response.data.error;
      }
    }
  }
});
</script>

<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-10-mobile is-6-tablet is-4-desktop">
      <form @submit="onSubmit">
        <div v-if="errorMessage" class="notification is-danger">
          {{ t(`errors.${errorMessage}`) }}
        </div>
        <FormTextField name="email" type="text" :label="t('email')" />
        <FormTextField name="password" type="password" :label="t('password')" />
        <button
          type="submit"
          class="button is-link is-rounded is-fullwidth"
          :class="{ 'is-loading': isSubmitting }"
        >
          {{ t('login') }}
        </button>
      </form>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "email": "Email",
    "password": "Password",
    "login": "Login",
    "errors": {
      "wrongCredentials": "Invalid email or password."
    }
  }
}
</i18n>
