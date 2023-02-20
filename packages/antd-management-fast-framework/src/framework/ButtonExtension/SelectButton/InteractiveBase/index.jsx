import {
  isFunction,
  showSimpleRuntimeError,
  toNumber,
} from 'easy-soft-utility';

import { selectModeCollection } from 'antd-management-fast-common';

import { Base } from '../Base';

class InteractiveBase extends Base {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      drawerVisible: false,
      modalVisible: false,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  showSelect = () => {
    const { selectMode } = this.props;

    if (toNumber(selectMode) === selectModeCollection.drawer) {
      this.showDrawer();
    }

    if (toNumber(selectMode) === selectModeCollection.modal) {
      this.showModal();
    }
  };

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  afterDrawerClose = () => {
    this.setState({ drawerVisible: false });
  };

  afterDrawerSelectSuccess = (o) => {
    this.afterSelectSuccessCore(o);
  };

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  afterModalSelectSuccess = (o) => {
    this.setState({
      modalVisible: false,
    });

    this.afterSelectSuccessCore(o);
  };

  afterModalCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  afterSelectSuccessCore = (o) => {
    if ((o || null) == null) {
      return;
    }

    const { afterSelect } = this.props;

    this.setState({
      selectData: o,
    });

    if (isFunction(afterSelect)) {
      afterSelect(o);
    }
  };

  renderSelectDrawer = () => {
    const text = '需要实现 renderSelectDrawer 方法';

    showSimpleRuntimeError(text);
  };

  renderSelectModal = () => {
    const text = '需要实现 renderSelectModal 方法';

    showSimpleRuntimeError(text);
  };

  renderOther = () => {
    const { selectMode } = this.props;

    if (toNumber(selectMode) === selectModeCollection.drawer) {
      return this.renderSelectDrawer();
    }

    if (toNumber(selectMode) === selectModeCollection.modal) {
      return this.renderSelectModal();
    }

    const text = '无效的选择项渲染模式';

    showSimpleRuntimeError(text);

    return null;
  };
}

InteractiveBase.defaultProps = {
  selectMode: selectModeCollection.drawer,
};

export { InteractiveBase };
