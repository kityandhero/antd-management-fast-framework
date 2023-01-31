import { runtimeSettings } from 'antd-management-fast-common';

const SettingModel = {
  namespace: 'settings',
  state: runtimeSettings,
  reducers: {
    changeSetting(state = runtimeSettings, { payload }) {
      const { contentWidth } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }

      return { ...state, ...payload };
    },
  },
};

export default SettingModel;
