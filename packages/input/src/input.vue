<script setup lang="ts">
// packages/input/src/input.vue
import { computed } from 'vue';
import { hello } from '@sui/utils';
import { defaultInputProps, InputProps } from './input';

const props = withDefaults(defineProps<InputProps>(), defaultInputProps());

const classes = computed(() => {
  const result: string[] = [];
  if (props.type) {
    result.push(`op-input--${props.type}`);
  }
  if (props.plain) {
    result.push('op-input--plain');
  }
  if (props.disabled) {
    result.push('op-input--disabled');
  }
  return result;
});

const emit = defineEmits<{
  (event: 'update:modelValue', val: string): void;
}>();

function inputHandler(e: any) {
  const { value } = e.target;
  emit('update:modelValue', value);
  hello(value);
}

</script>

<template>
  <input
    class="op-input"
    :class="classes"
    :disabled="props.disabled"
    type="text"
    :value="modelValue"
    @input="inputHandler"
  >
</template>
