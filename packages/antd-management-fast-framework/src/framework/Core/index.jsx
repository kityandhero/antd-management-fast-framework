import {
  defaultCoreState,
  getDerivedStateFromPropertiesForUrlParametersCore,
} from 'antd-management-fast-common';
import { BaseComponent } from 'antd-management-fast-component';

class Core extends BaseComponent {
  lastLoadParams = null;

  constructor(properties) {
    super(properties);

    this.lastLoadParams = null;

    const defaultState = defaultCoreState();

    this.state = {
      ...defaultState,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParametersCore();
  }
}

export { Core };
