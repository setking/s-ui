<script setup lang="ts">
import { hello } from "@sui/utils";
const props = withDefaults(defineProps<{ text?: string }>(), {
  text: "World",
});
function clickHandler() {
  hello(props.text);
}
</script>

<template>
  <button class="open-button" @click="clickHandler">
    <slot></slot>
  </button>
</template>
