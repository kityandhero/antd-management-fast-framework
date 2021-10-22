import { ImportOutlined } from '@ant-design/icons';

import { isFunction, stringIsNullOrWhiteSpace } from '../../../utils/tools';
import { buildButton } from '../../../customComponents/FunctionComponent';

import MultiPageDrawer from '../MultiPageDrawer';

class MultiPageSelectDrawer extends MultiPageDrawer {
  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  selectRecord = ({ handleData }) => {
    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(handleData);
    }

    this.hideDrawer();
  };

  renderSelectButton = ({
    confirm = false,
    text: textSource = '选择',
    icon: iconSource = <ImportOutlined />,
    handleData = null,
    showIcon = true,
  }) => {
    return buildButton({
      ...{
        confirm,
        size: 'small',
        icon: iconSource || <ImportOutlined />,
        text: textSource || '选择',
        showIcon,
        handleClick: () =>
          this.selectRecord({ handleData: handleData || null }),
      },
    });
  };
}

export default MultiPageSelectDrawer;
