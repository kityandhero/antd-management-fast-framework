import { Button } from 'antd';

import { showSimpleRuntimeError } from 'easy-soft-utility';

import { SupplementWrapper } from '../../../CustomWrapper/SupplementWrapper';

class Base extends SupplementWrapper {
  loadDataAfterMount = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      selectData: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  showSelect = () => {
    const text = 'showSelect 方法需要在上层进行实现';

    showSimpleRuntimeError(text);
  };

  getFieldData = () => {
    return {
      fieldText: '',
      fieldTitle: '',
      placeholder: '请选择',
    };
  };

  renderButton = () => {
    const { children, buttonProps } = this.props;

    const p = {
      ...(buttonProps || []),

      onClick: () => {
        this.showSelect();
      },
    };

    return <Button {...p}>{children}</Button>;
  };

  renderFurther() {
    return (
      <>
        {this.renderButton()}

        {this.renderOther()}
      </>
    );
  }
}

export { Base };
