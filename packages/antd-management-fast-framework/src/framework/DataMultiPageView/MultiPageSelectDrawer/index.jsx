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

import { MultiPageDrawer } from '../MultiPageDrawer';

class MultiPageSelectDrawer extends MultiPageDrawer {
  showListViewItemActionSelect = true;

  confirmSelect = false;

  selectListData = [];

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.selectListData = [];
  };

  doOtherWhenChangeVisibleToHide = () => {
    this.logCallTrack(
      {},
      'DataSinglePageView::MultiPageSelectDrawer',
      'doOtherWhenChangeVisibleToHide',
    );

    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      this.logCallTrace(
        {},
        'DataSinglePageView::MultiPageSelectDrawer',
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
      );

      afterSelectSuccess(this.selectListData);
    } else {
      this.logCallTrace(
        {},
        'DataSinglePageView::MultiPageSelectDrawer',
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
        emptyLogic,
      );
    }
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '选择',
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
      'DataSinglePageView::MultiPageSelectDrawer',
      'buildSelectNotificationDescription',
      emptyLogic,
    );

    return '';
  };

  selectRecord = ({ handleData }) => {
    this.logCallTrack(
      {},
      'DataSinglePageView::MultiPageSelectDrawer',
      'selectRecord',
    );

    if (!isArray(this.selectListData)) {
      this.selectListData = [];
    }

    const { multiSelect, hideAfterSelect } = this.props;

    if (multiSelect) {
      this.selectListData.push(handleData);
    } else {
      this.selectListData = [handleData];
    }

    this.logCallTrace(
      multiSelect
        ? { selectData: this.selectListData }
        : { selectData: this.selectListData[0] },
      'DataSinglePageView::MultiPageSelectDrawer',
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
          'DataSinglePageView::MultiPageSelectDrawer',
          'selectRecord',
          'showSuccessNotification',
          'ignore when message is empty',
        );
      } else {
        this.logCallTrace(
          {},
          'DataSinglePageView::MultiPageSelectDrawer',
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

MultiPageSelectDrawer.defaultProps = {
  width: 820,
  multiSelect: false,
  hideAfterSelect: true,
};

export { MultiPageSelectDrawer };
