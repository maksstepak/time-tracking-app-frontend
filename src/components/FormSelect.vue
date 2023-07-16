<script setup lang="ts">
import type { SelectOption } from '@/types/SelectOption';
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    options: SelectOption[];
    isLoading?: boolean;
  }>(),
  {
    isLoading: false,
  }
);

const nameRef = toRef(props, 'name');
const { value, errors } = useField(nameRef);
</script>

<template>
  <div class="field">
    <label class="label">{{ props.label }}</label>
    <div class="control">
      <div class="select" :class="{ 'is-loading': isLoading }">
        <select v-model="value">
          <option
            v-for="option in props.options"
            :key="option.id"
            :value="option.id"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <template v-if="errors.length">
      <p v-for="message in errors" :key="message" class="help is-danger">
        {{ message }}
      </p>
    </template>
  </div>
</template>
