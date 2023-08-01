import { connect } from 'easy-soft-dva';
import { formatCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { getBusinessModeName } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseLoadDrawer } = DataDrawer;
const {
  Whether: { getWhetherName },
} = FunctionSupplement;

const visibleFlag = '4ada8ed32b5d480fa00b65a9856e3557';

@connect(({ yonYouPushMessage, schedulingControl }) => ({
  yonYouPushMessage,
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
      pageTitle: '用友推送信息',
      loadApiPath: 'yonYouPushMessage/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.yonYouPushMessageId = getValueByKey({
      data: externalData,
      key: fieldData.yonYouPushMessageId.name,
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
                  label: fieldData.serialNumber.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.serialNumber.name,
                  }),
                },
                {
                  label: fieldData.personnelCode.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.personnelCode.name,
                  }),
                },
                {
                  label: fieldData.businessMode.label,
                  value: getBusinessModeName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.businessMode.name,
                    }),
                  }),
                },
                {
                  label: fieldData.pushTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.pushTime.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.url.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.url.name,
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
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.sendComplete.label,
                  value: getWhetherName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.sendComplete.name,
                    }),
                  }),
                },
                {
                  label: fieldData.createOperatorId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createOperatorId.name,
                  }),
                },
                {
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                    format: formatCollection.datetime,
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
