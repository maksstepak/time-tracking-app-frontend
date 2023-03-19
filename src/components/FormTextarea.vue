<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, toRef } from 'vue';

const props = defineProps<{
  name: string;
  label: string;
}>();

const nameRef = toRef(props, 'name');
const { value, errors, handleChange } = useField<string>(nameRef, undefined, {
  validateOnValueUpdate: false,
});

const validationListeners = computed(() => {
  if (!errors.value.length) {
    return {
      blur: handleChange,
      change: handleChange,
      input: (e: unknown) => handleChange(e, false),
    };
  }
  return {
    blur: handleChange,
    change: handleChange,
    input: handleChange,
  };
});
</script>

<template>
  <div class="field">
    <label class="label">{{ props.label }}</label>
    <div class="control">
      <textarea
        class="textarea"
        :name="props.name"
        v-model="value"
        :class="{
          'is-danger': errors.length,
        }"
        v-on="validationListeners"
      />
    </div>
    <template v-if="errors.length">
      <p v-for="message in errors" :key="message" class="help is-danger">
        {{ message }}
      </p>
    </template>
  </div>
</template>
