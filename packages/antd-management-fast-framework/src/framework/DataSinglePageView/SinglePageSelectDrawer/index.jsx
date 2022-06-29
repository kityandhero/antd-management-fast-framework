import { buildButton } from '../../../customComponents/FunctionComponent';
import { iconCollection } from '../../../utils/constants';
import { isFunction } from '../../../utils/tools';
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
    icon: iconSource = iconCollection.import,
    handleData = null,
    showIcon = true,
  }) => {
    return buildButton({
      ...{
        confirm,
        size: 'small',
        icon: iconSource || iconCollection.import,
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
