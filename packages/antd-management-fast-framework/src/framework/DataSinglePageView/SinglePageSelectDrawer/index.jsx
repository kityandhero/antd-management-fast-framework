import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  showSuccessNotification,
} from 'easy-soft-utility';

import { emptyLogic } from 'antd-management-fast-common';
import {
  buildListViewItemActionSelect,
  iconBuilder,
} from 'antd-management-fast-component';

import { SinglePageDrawer } from '../SinglePageDrawer';

const primaryCallName = 'DataSinglePageView::SinglePageSelectDrawer';

class SinglePageSelectDrawer extends SinglePageDrawer {
  showListViewItemActionSelect = true;

  useFrontendPagination = false;

  confirmSelect = false;

  selectListData = [];

  selectChanged = false;

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToShow',
    );

    this.logCallTrace(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToShow',
      'reset selectListData => [] and selectChanged => false',
    );

    this.selectListData = [];
    this.selectChanged = false;
  };

  doOtherWhenChangeVisibleToHide = () => {
    if (!this.selectChanged) {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
        'ignore when no change in selection',
      );

      return;
    }

    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToHide');

    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
      );

      afterSelectSuccess(this.selectListData);
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
        emptyLogic,
      );
    }
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '选取',
      placement: 'topRight',
      icon: iconBuilder.import(),
      handleButtonClick: ({ handleData }) => {
        this.selectRecord({ handleData: handleData || null });
      },
      handleData: record,
      confirm: this.confirmSelect,
      title: this.confirmSelect ? '确定选择此项吗？' : '',
    };
  };

  // eslint-disable-next-line no-unused-vars
  buildSelectNotificationDescription = (data) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildSelectNotificationDescription',
      emptyLogic,
    );

    return '';
  };

  selectRecord = ({ handleData }) => {
    this.logCallTrack({}, primaryCallName, 'selectRecord');

    if (!isArray(this.selectListData)) {
      this.selectListData = [];
    }

    const { multiSelect, hideAfterSelect } = this.props;

    if (multiSelect) {
      this.selectListData.push(handleData);
    } else {
      this.selectListData = [handleData];
    }

    this.selectChanged = true;

    this.logCallTrace(
      multiSelect
        ? { selectData: this.selectListData }
        : { selectData: this.selectListData[0] },
      primaryCallName,
      'selectRecord',
      'select info',
    );

    if (!multiSelect && hideAfterSelect) {
      this.hideDrawer();
    } else {
      const text = this.buildSelectNotificationDescription(this.selectListData);

      if (checkStringIsNullOrWhiteSpace(text)) {
        this.logCallTrace(
          {},
          primaryCallName,
          'selectRecord',
          'showSuccessNotification',
          'ignore when message is empty',
        );
      } else {
        this.logCallTrace(
          {},
          primaryCallName,
          'selectRecord',
          'showSuccessNotification',
        );

        showSuccessNotification({
          title: '操作结果',
          description: text,
          placement: 'bottom-left',
        });
      }
    }
  };

  renderPresetListViewItemActionSelect = (item, index) => {
    const that = this;

    return buildListViewItemActionSelect({
      confirm: this.confirmSelect,
      index,
      selectData: item,
      selectCallback: (data) => that.selectRecord({ handleData: data || null }),
    });
  };
}

SinglePageDrawer.defaultProps = {
  width: 820,
  multiSelect: false,
  hideAfterSelect: true,
};

export { SinglePageSelectDrawer };
