// eslint-disable-next-line import/no-relative-packages
import { GenerateVueConfig } from '../build/scripts';

export default GenerateVueConfig({
  presetSuiOptions: {
    // config-provider 组件暂时没有 UnoCSS 样式预设
    include: [],
  },
});
