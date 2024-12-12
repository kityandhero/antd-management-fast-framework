import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;

const visibleFlag = '189c0b9766d84fa2b5117a9b17a53497';

@connect(({ queueInfo, schedulingControl }) => ({
  queueInfo,
  schedulingControl,
}))
class PreviewDrawer extends BaseLoadDrawer {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '队列摘要信息',
      loadApiPath: 'queueInfo/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.name = getValueByKey({
      data: externalData,
      key: fieldData.name.name,
    });

    return d;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.name.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.name.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.queueInfoId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.queueInfoId.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.count.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.count.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
      ],
    };
  };
}

export { PreviewDrawer };
