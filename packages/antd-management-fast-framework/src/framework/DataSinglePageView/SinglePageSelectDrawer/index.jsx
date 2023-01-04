import { isFunction } from 'antd-management-fast-common/es/utils/tools';
import { buildButton } from 'antd-management-fast-component/es/customComponents/FunctionComponent';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';

import SinglePageDrawer from '../SinglePageDrawer';

class SinglePageSelectDrawer extends SinglePageDrawer {
  showListViewItemActionSelect = true;

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
    icon: iconSource = iconBuilder.import(),
    handleData = null,
    showIcon = true,
  }) => {
    return buildButton({
      ...{
        confirm,
        size: 'small',
        icon: iconSource || iconBuilder.import(),
        text: textSource || '选择',
        showIcon,
        handleClick: () =>
          this.selectRecord({ handleData: handleData || null }),
      },
    });
  };
}

SinglePageDrawer.defaultProps = {
  width: 820,
};

export default SinglePageSelectDrawer;
