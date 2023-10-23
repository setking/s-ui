<script setup lang="ts">
import { hello } from "@sui/utils";
withDefaults(defineProps<{ modeVal?: string }>(), {
  modeVal: "",
});
const emit = defineEmits<{ (event: "update:modeVal", val: string): void }>();
function inputHandler(e: any) {
  const value: string = e.target.value;
  emit("update:modeVal", value);
  hello(value);
}
</script>

<template>
  <input
    type="text"
    class="open-input"
    :value="modeVal"
    @input="inputHandler"
  />
</template>
