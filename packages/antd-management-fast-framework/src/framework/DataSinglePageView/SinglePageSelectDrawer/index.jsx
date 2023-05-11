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

class SinglePageSelectDrawer extends SinglePageDrawer {
  showListViewItemActionSelect = true;

  useFrontendPagination = false;

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
      'DataSinglePageView::SinglePageSelectDrawer',
      'doOtherWhenChangeVisibleToHide',
    );

    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      this.logCallTrace(
        {},
        'DataSinglePageView::SinglePageSelectDrawer',
        'doOtherWhenChangeVisibleToHide',
        'afterSelectSuccess',
      );

      afterSelectSuccess(this.selectListData);
    } else {
      this.logCallTrace(
        {},
        'DataSinglePageView::SinglePageSelectDrawer',
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
      'DataSinglePageView::SinglePageSelectDrawer',
      'buildSelectNotificationDescription',
      emptyLogic,
    );

    return '';
  };

  selectRecord = ({ handleData }) => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageSelectDrawer',
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
      'DataSinglePageView::SinglePageSelectDrawer',
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
          'DataSinglePageView::SinglePageSelectDrawer',
          'selectRecord',
          'showSuccessNotification',
          'ignore when message is empty',
        );
      } else {
        this.logCallTrace(
          {},
          'DataSinglePageView::SinglePageSelectDrawer',
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
