import parse from 'html-react-parser';
import React from 'react';

import { connect } from 'easy-soft-dva';
import { isArray, isEmptyArray, toNumber } from 'easy-soft-utility';

import { cardConfig, dataTypeCollection } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { BaseFormDrawer } from '../../framework/DataDrawer/BaseFormDrawer';
import { switchControlAssist } from '../../utils/switchControlAssist';

import styles from './index.less';

const visibleFlag = '276b262ee5bc4c138c5e38f552fcf9e7';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class DataPreviewDrawer extends BaseFormDrawer {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  showReloadButton = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      showBottomBar: true,
    };
  }

  getProperties = () => {
    return {
      title: '',
      descriptionLabel: '简要描述',
      description: '',
      listData: [],
      icon: iconBuilder.read(),
      placement: 'left',
      width: 380,
      dataType: dataTypeCollection.commonValue.flag,
      ...this.props,
    };
  };

  /**
   * 渲染标题图标，默认为空，可根据需要重载。
   * @function
   * @returns {Object} 标题图标
   */
  renderPresetTitleIcon = () => {
    const { icon } = this.getProperties();

    return icon;
  };

  /**
   * 获取页面标题。
   * @function
   */
  getPresetPageTitle = () => {
    const { title } = this.getProperties();

    return title || '';
  };

  /**
   * 构造 Card 配置集合。
   * @function
   */
  establishCardCollectionConfig = () => {
    const {
      descriptionLabel,
      description,
      dataType,
      data,
      listData: otherListData,
    } = this.getProperties();

    const list = [
      {
        title: {
          icon: iconBuilder.contacts(),
          text: '说明',
        },
        items: [
          {
            lg: 24,
            type: cardConfig.contentItemType.customGrid,
            list: [
              {
                label: descriptionLabel || '简要描述',
                value: description,
              },
            ],
            props: {
              bordered: true,
              size: 'small',
              column: 1,
              labelStyle: {
                width: '90px',
              },
              emptyValue: '暂无',
              ellipsis: false,
            },
          },
        ],
      },
    ];

    if (toNumber(dataType) === dataTypeCollection.commonValue.flag) {
      list.push({
        title: {
          icon: iconBuilder.contacts(),
          text: '操作内容',
        },
        items: [
          {
            lg: 24,
            type: cardConfig.contentItemType.onlyShowText,
            fieldData: {
              label: '操作内容',
              helper: '',
            },
            value: data,
          },
        ],
      });
    } else if (
      dataType === dataTypeCollection.jsonObject.flag ||
      dataType === dataTypeCollection.jsonObjectList.flag
    ) {
      list.push({
        title: {
          icon: iconBuilder.contacts(),
          text: '数据变更',
        },
        items: [
          {
            lg: 24,
            type: cardConfig.contentItemType.jsonView,
            value: data,
          },
        ],
      });
    } else {
      list.push({
        title: {
          icon: iconBuilder.contacts(),
          text: '操作内容',
        },
        items: [
          {
            lg: 24,
            type: cardConfig.contentItemType.onlyShowText,
            fieldData: {
              label: '操作内容',
              helper: '',
            },
            value: data,
          },
        ],
      });
    }

    if (isArray(otherListData) && !isEmptyArray(otherListData)) {
      for (const item of otherListData) {
        list.push(item);
      }
    }

    return { list };
  };

  /**
   * 渲染内容容器。
   * @function
   * @returns {Object} 渲染结果
   */
  renderPresetContentContainor = () => {
    const { dataType, data } = this.getProperties();

    if (dataType === dataTypeCollection.html.flag) {
      return <div className={styles.previewContainor}>{parse(data)}</div>;
    }

    return (
      <div className={styles.contentContainor}>{this.renderPresetForm()}</div>
    );
  };
}

export { DataPreviewDrawer };
