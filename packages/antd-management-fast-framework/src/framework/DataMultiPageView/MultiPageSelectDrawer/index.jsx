import { ImportOutlined } from '@ant-design/icons';

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
    title: titleSource = '选择这条数据，确定吗？',
    text: textSource = '选择',
    icon: iconSource = <ImportOutlined />,
    handleData = null,
  }) => {
    return buildButton({
      size: 'small',
      icon: iconSource || <ImportOutlined />,
      text: textSource || '选择',
      handleClick: () => this.selectRecord({ handleData: handleData || null }),
      confirm: {
        title: titleSource || '选择这条数据，确定吗？',
      },
    });
  };
}

export default MultiPageSelectDrawer;
