import {
  defaultCoreState,
  getDerivedStateFromPropsForUrlParamsCore,
} from 'antd-management-fast-common/es/utils/tools';
import BaseComponent from 'antd-management-fast-component/es/customComponents/BaseComponent';

class Core extends BaseComponent {
  lastLoadParams = null;

  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultCoreState();

    this.state = {
      ...defaultState,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParamsCore();
  }

  doDidMountTask = () => {
    this.adjustWhenDidMount();
  };

  adjustWhenDidMount = () => {};
}

export default Core;
