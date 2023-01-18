<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <i18n-t keypath="text" tag="p">
        <template #appName
          ><strong>{{ t('global.appName') }}</strong></template
        >
        <template #author>
          <a href="https://github.com/maksstepak">{{ t('author') }}</a>
        </template>
      </i18n-t>
    </div>
  </footer>
</template>

<i18n lang="json">
{
  "en": {
    "text": "{appName} by {author}. The app is made with Laravel 9 and Vue 3.",
    "author": "Maksymilian Stępak"
  }
}
</i18n>
