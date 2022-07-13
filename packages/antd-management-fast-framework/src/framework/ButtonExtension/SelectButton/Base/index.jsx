import { Button } from 'antd';

import { showRuntimeError } from '../../../../utils/tools';
import SupplementWrapper from '../../../CustomWrapper/SupplementWrapper';

class Base extends SupplementWrapper {
  loadDataAfterMount = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        selectData: null,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  showSelect = () => {
    const text = 'showSelect 方法需要在上层进行实现';

    showRuntimeError({
      message: text,
    });
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
      ...{
        onClick: () => {
          this.showSelect();
        },
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

export default Base;
