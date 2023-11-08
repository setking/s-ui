// eslint-disable-next-line import/no-relative-packages
import { GenerateVueConfig } from '../build/scripts';

export default GenerateVueConfig({
  presetSuiOptions: {
    include: ['button'],
  },
});
