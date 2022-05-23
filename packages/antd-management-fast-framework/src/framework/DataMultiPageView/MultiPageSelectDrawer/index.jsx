import { ImportOutlined } from '@ant-design/icons';
import { buildButton } from '../../../customComponents/FunctionComponent';
import { isFunction } from '../../../utils/tools';
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
