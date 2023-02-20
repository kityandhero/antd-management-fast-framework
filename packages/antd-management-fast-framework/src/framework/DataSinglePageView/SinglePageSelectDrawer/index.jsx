import { isFunction } from 'easy-soft-utility';

import { buildButton, iconBuilder } from 'antd-management-fast-component';

import { SinglePageDrawer } from '../SinglePageDrawer';

class SinglePageSelectDrawer extends SinglePageDrawer {
  showListViewItemActionSelect = true;

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
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
      confirm,
      size: 'small',
      icon: iconSource || iconBuilder.import(),
      text: textSource || '选择',
      showIcon,
      handleClick: () => this.selectRecord({ handleData: handleData || null }),
    });
  };
}

SinglePageDrawer.defaultProps = {
  width: 820,
};

export { SinglePageSelectDrawer };
