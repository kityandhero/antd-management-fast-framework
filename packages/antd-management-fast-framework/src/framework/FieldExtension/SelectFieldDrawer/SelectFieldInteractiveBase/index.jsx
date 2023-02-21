import {
  isFunction,
  showSimpleRuntimeError,
  showWarningMessage,
  toNumber,
} from 'easy-soft-utility';

import { selectModeCollection } from 'antd-management-fast-common';

import { SelectFieldBase } from '../SelectFieldBase';

class SelectFieldInteractiveBase extends SelectFieldBase {
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
      const { fieldTitle, fieldPlaceholder } = this.getFieldData() || {
        fieldTitle: '',
        fieldPlaceholder: '请选择',
      };

      showWarningMessage({
        message: `${fieldPlaceholder}${fieldTitle}`,
      });

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

  renderPresetSelectDrawer = () => {
    const text = '需要实现 renderPresetSelectDrawer 方法';

    showSimpleRuntimeError(text);
  };

  renderPresetSelectModal = () => {
    const text = '需要实现 renderPresetSelectModal 方法';

    showSimpleRuntimeError(text);
  };

  renderPresetOther = () => {
    const { selectMode } = this.props;

    if (toNumber(selectMode) === selectModeCollection.drawer) {
      return this.renderPresetSelectDrawer();
    }

    if (toNumber(selectMode) === selectModeCollection.modal) {
      return this.renderPresetSelectModal();
    }

    const text = '无效的选择项渲染模式';

    showSimpleRuntimeError(text);

    return null;
  };
}

SelectFieldInteractiveBase.defaultProps = {
  showClear: true,
  selectMode: selectModeCollection.drawer,
};

export { SelectFieldInteractiveBase };
