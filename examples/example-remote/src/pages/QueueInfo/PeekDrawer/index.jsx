import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '7aa13e812f1e4247b72c5988c9923245';

@connect(({ queueInfo, schedulingControl }) => ({
  queueInfo,
  schedulingControl,
}))
class PeekDrawer extends BaseLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '尝试读取队列数据',
      loadApiPath: 'queueInfo/tryPeek',
      json: '',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.setState({
      json: '',
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.name = getValueByKey({
      data: externalData,
      key: fieldData.name.name,
    });

    return d;
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      json: getValueByKey({
        data: metaData,
        key: fieldData.json.name,
        defaultValue: '',
      }),
    });
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.jsonView,
              value: getValueByKey({
                data: metaData,
                key: fieldData.json.name,
              }),
            },
          ],
        },
      ],
    };
  };
}

export { PeekDrawer };
