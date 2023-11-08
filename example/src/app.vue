<script lang="ts" setup>
import { ref, reactive } from 'vue';
import {
  Button,
  Input,
  useTheme,
  tinyThemeVars,
  ConfigProvider,
  themeVars,
  SuiCssVarConfig,
} from '@sui/ui';

const { setTheme } = useTheme();

const currentGlobalTheme = ref<'default' | 'tiny'>('default');
function switchGlobalTheme() {
  if (currentGlobalTheme.value === 'tiny') {
    currentGlobalTheme.value = 'default';
    setTheme(themeVars);
  } else {
    currentGlobalTheme.value = 'tiny';
    setTheme(tinyThemeVars);
  }
}
const currentSecondLineTheme = ref<'default' | 'tiny'>('default');
const secondLineThemeVars: SuiCssVarConfig = reactive({});
function switchSecondLineTheme() {
  if (currentSecondLineTheme.value === 'tiny') {
    currentSecondLineTheme.value = 'default';
    Object.assign(secondLineThemeVars, themeVars);
  } else {
    currentSecondLineTheme.value = 'tiny';
    Object.assign(secondLineThemeVars, tinyThemeVars);
  }
}
</script>
<template>
  <div>
    <ConfigProvider
      class="btns"
      :theme-vars="secondLineThemeVars"
    >
      <Button>Button</Button>
      <Button type="primary">
        Button
      </Button>
      <Button type="success">
        Button
      </Button>
      <Button type="danger">
        Button
      </Button>
      <Button type="warning">
        Button
      </Button>
      <Button type="info">
        Button
      </Button>
    </ConfigProvider>
    <div class="btns">
      <Button plain>
        Button
      </Button>
      <Button
        type="primary"
        plain
      >
        Button
      </Button>
      <Button
        type="success"
        plain
      >
        Button
      </Button>
      <Button
        type="danger"
        plain
      >
        Button
      </Button>
      <Button
        type="warning"
        plain
      >
        Button
      </Button>
      <Button
        type="info"
        plain
      >
        Button
      </Button>
    </div>
    <div class="btns">
      <Button disabled>
        Button
      </Button>
      <Button
        type="primary"
        disabled
      >
        Button
      </Button>
      <Button
        type="success"
        disabled
      >
        Button
      </Button>
      <Button
        type="danger"
        disabled
      >
        Button
      </Button>
      <Button
        type="warning"
        disabled
      >
        Button
      </Button>
      <Button
        type="info"
        disabled
      >
        Button
      </Button>
    </div>
    <div>
      <i class="i-op-alert text-100px c-primary inline-block" />
      <i class="i-op-alert-marked text-60px c-success inline-block" />
    </div>
    <!-- 第三组 button 省略 。。。 -->
    <div class="btns">
      <Button @click="switchGlobalTheme">
        切换全局主题，当前：{{ currentGlobalTheme }}
      </Button>
      <Button @click="switchSecondLineTheme">
        切换第二行主题，当前：{{ currentSecondLineTheme }}
      </Button>
    </div>
    <Input />
    <Input
      type="warning"
      disabled
    />
    <Input
      type="info"
      disabled
    />
  </div>
</template>
<style lang="scss" scoped>
.btns {
  :deep(.op-button) {
    margin-bottom: 10px;

    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}
</style>
