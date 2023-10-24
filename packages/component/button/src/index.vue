<script setup lang="ts">
import { hello } from '@sui/utils';

const props = withDefaults(defineProps<{ text?: string }>(), {
  text: 'World',
});
function clickHandler() {
  hello(props.text);
}
</script>

<template>
  <button
    class="open-button test-class"
    @click="clickHandler"
  >
    <slot />
  </button>
  <div>shou time</div>
</template>
<style lang="scss" scoped>
@import "./buton";

.open-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  background-color: #e9ecef;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
</style>
