<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label: string;
    value?: string | boolean;
  }>(),
  {
    value: true,
  }
);

const nameRef = toRef(props, 'name');
const { checked, handleChange, errors } = useField(nameRef, undefined, {
  type: 'checkbox',
  checkedValue: props.value,
  uncheckedValue: false,
});

const onChange = () => handleChange(props.value);
</script>

<template>
  <div class="field">
    <label class="checkbox">
      <input
        type="checkbox"
        :name="props.name"
        :checked="checked"
        @change="onChange"
      />
      {{ props.label }}
    </label>
    <template v-if="errors.length">
      <p v-for="message in errors" :key="message" class="help is-danger">
        {{ message }}
      </p>
    </template>
  </div>
</template>
